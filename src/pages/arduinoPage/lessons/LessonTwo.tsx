import { useState } from "react";
import classNames from 'classnames';
import { Spinner } from "../../../ui-base/spinner/Spinner";
import "./../ArduinoPage.styled.scss";
import { buildHex } from "../utils";
import { PinState } from "avr8js";
import { AVRRunner } from "../execute";
import Editor from '@monaco-editor/react';

export const LessonTwo = () => {
    const [ledState, setLedState] = useState(false);
    const [brightness, setBrightness] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isActiveRun, setIsActiveRun] = useState(false);

    const arduinoCode = `
        void setup() {
            Serial.begin(115200);
            pinMode(11, OUTPUT);
        }
        
        byte brightness = 0;

        void loop() {
            analogWrite(11, brightness);
            delay(20);
            brightness++;
        }
    `;

    const [value, setValue] = useState<string | undefined>(arduinoCode);

    const handleRunCode = async () => {
        setIsLoading(true);
        const hex = await buildHex(value!);
    
        if (!hex) return;
        const runner = new AVRRunner(hex);
        
        let lastState = PinState.Input;
        let lastStateCycles = 0;
        let lastUpdateCycles = 0;
        let ledHighCycles = 0;

        runner.portB.addListener(() => {
            const pin11State = runner.portB.pinState(3);
            if (lastState !== pin11State) {
              const delta = runner.cpu.cycles - lastStateCycles;
              if (lastState === PinState.High) {
                ledHighCycles += delta;
              }
              lastState = pin11State;
              lastStateCycles = runner.cpu.cycles;
            }
          });
        setIsLoading(false);
        setIsActiveRun(true);
        
        runner.execute((cpu) => {
            const cyclesSinceUpdate = cpu.cycles - lastUpdateCycles;
            const pin11State = runner.portB.pinState(3);

            if (pin11State === PinState.High) {
                ledHighCycles += cpu.cycles - lastStateCycles;
            }
            setLedState(ledHighCycles > 0);
            setBrightness(ledHighCycles / cyclesSinceUpdate);
            lastUpdateCycles = cpu.cycles;
            lastStateCycles = cpu.cycles;
            ledHighCycles = 0;
        });
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
                        <wokwi-led color="green" value={ledState ? true : undefined} brightness={brightness} />
                    </>
                )}
            </div>

            <h3 className="subtitle">The LED is located under output port number 11. <br/> Write your code here:</h3>

            <Editor height="40vh" defaultLanguage="cpp" defaultValue={arduinoCode} onChange={handleTextChange} />

            <div className={classNames('buttonRun', { 'active': isActiveRun })} onClick={handleRunCode}>
                <span>Run</span>
            </div>
        </>
    )
}