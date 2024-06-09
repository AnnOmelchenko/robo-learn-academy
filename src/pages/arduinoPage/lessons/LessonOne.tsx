import { useState } from "react";
import classNames from 'classnames';
import { Spinner } from "../../../ui-base/spinner/Spinner";
import "./../ArduinoPage.styled.scss";
import { compile } from "../utils";
import { avrInstruction, AVRTimer, timer0Config, PinState } from "avr8js";
import Editor from '@monaco-editor/react';

export const LessonOne = () => {
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

    const [value, setValue] = useState<string | undefined>(arduinoCode);

    const handleRunCode = async () => {
        setIsLoading(true);
        const compiledData = await compile(value!);
    
        if (!compiledData) return;
        const { port, cpu } = compiledData;
        
        port.addListener(() => {
          const turnOn = port.pinState(7) === PinState.High;
          setLedState(turnOn);
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

    const handleTextChange = (curValue?: string) => {
        setValue(curValue);
    }

    return (
        <>
            <div className="componentWrapper">
                {isLoading ? <Spinner /> : (
                    <>
                        <wokwi-arduino-uno />
                        <wokwi-led color="red" value={ledState ? true : undefined} />
                    </>
                )}
            </div>

            <h3 className="subtitle">The LED is located under output port number 7. <br/> Write your code here:</h3>

            <Editor height="40vh" defaultLanguage="cpp" defaultValue={arduinoCode} onChange={handleTextChange} />

            <div className={classNames('buttonRun', { 'active': isActiveRun })} onClick={handleRunCode}>
                <span>Run</span>
            </div>
        </>
    )
}