import { useState, ChangeEvent } from "react";
import "@wokwi/elements";
import { parse } from "intel-hex";
import { Buffer } from 'buffer';
import { CPU, avrInstruction, AVRTimer, timer0Config, AVRIOPort, portDConfig, PinState } from "avr8js";
import classNames from 'classnames'

import "./ArduinoPage.styled.scss";
import { Spinner } from "../../ui-base/spinner/Spinner";

// @ts-ignore
window.Buffer = Buffer;

export const ArduinoPage = () => {
  const [ledState, setLedState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActiveRun, setIsActiveRun] = useState(false);

  const arduinoCode = `
    void setup() {
      pinMode(7, OUTPUT); 
    }

    void loop() {
      digitalWrite(7, HIGH);
      delay(1000);
      digitalWrite(7, LOW);
      delay(1000);
    }
  `;

  const [value, setValue] = useState(arduinoCode);

  const handleRunCode = async () => {
    setIsLoading(true);
    const result = await fetch('https://hexi.wokwi.com/build', {
      method: 'post',
      body: JSON.stringify({ sketch: value }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const { hex, stderr } = await result.json();

    console.log(hex, stderr)
    if (!hex) {
      alert(stderr);
      return;
    }

    const buff = Buffer.from(hex, "utf-8");
    const { data } = parse(buff);
    const progData = new Uint8Array(data);
    
    const cpu = new CPU(new Uint16Array(progData.buffer));

    const port = new AVRIOPort(cpu, portDConfig);
    port.addListener(() => {
      const turnOn = port.pinState(7) === PinState.High;
      setLedState(turnOn);
      console.log('LED', turnOn);
    });
    
    new AVRTimer(cpu, timer0Config);
    setIsLoading(false);
    setIsActiveRun(true);
    while(true) {
      for (let i = 0; i < 500000; i++) {
        avrInstruction(cpu);
        cpu.tick();
      }
      await new Promise(resolve => setTimeout(resolve));
    }
  }

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }

  return (
      <div className="arduinoPage">
        <>
          <h3 className="title">ARDUINO SIMULATOR</h3>
          <div className="componentWrapper">
            {isLoading ? <Spinner /> : (
              <div className="componentWrapper">
                <wokwi-led color="red" value={ledState ? true : undefined} />
              </div>
            )}
          </div>

          <h3 className="subtitle">Write your code here:</h3>

          <textarea onChange={handleTextChange} value={value} placeholder={arduinoCode} style={{ width: '100%'}} rows={20} />

          <div className={classNames('buttonRun', { 'active': isActiveRun })} onClick={handleRunCode}>
            <span>Run</span>
          </div>
        </>
      </div>
  );
};
