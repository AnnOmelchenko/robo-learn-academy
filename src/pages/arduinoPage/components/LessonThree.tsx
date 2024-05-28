import { useState, useRef } from "react";
import classNames from 'classnames';
import { Spinner } from "../../../ui-base/spinner/Spinner";
import "./../ArduinoPage.styled.scss";
import { buildHex } from "../utils";
import { PinState } from "avr8js";
import { AVRRunner } from "../execute";
import Editor from '@monaco-editor/react';

export const LessonThree = () => {
    const [greenLedState, setGreenLedState] = useState(false);
    const [yellowLedState, setYellowLedState] = useState(false);
    const [redLedState, setRedLedState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isActiveRun, setIsActiveRun] = useState(false);
    const greenButton = useRef(null);
    const redButton = useRef(null);

    const arduinoCode = `
    void setup() {
        Serial.begin(115200);
        pinMode(2, INPUT_PULLUP);
        pinMode(3, INPUT_PULLUP);
        pinMode(11, OUTPUT);
        pinMode(12, OUTPUT);
        pinMode(13, OUTPUT);
    }
      
    int i = 0;
    void loop() {
        bool green = digitalRead(2);
        bool red = digitalRead(3);
    
        digitalWrite(11, green);
        digitalWrite(13, red);
        delay(250);
    
        i += 1;
    
        digitalWrite(12, i % 2);
    }
    `;

    const [value, setValue] = useState<string | undefined>(arduinoCode);

    const handleRunCode = async () => {
        setIsLoading(true);
        const hex = await buildHex(value!);
    
        if (!hex) return;
        const runner = new AVRRunner(hex);

        runner.portB.addListener(() => {
            const pin12State = runner.portB.pinState(4);
            setYellowLedState(pin12State === PinState.High);
        });
        setIsLoading(false);
        setIsActiveRun(true);
        
        runner.execute(() => {
            // @ts-ignore
            greenButton.current?.addEventListener('button-press', () => {
                setGreenLedState(true);
            })
            // @ts-ignore
            greenButton.current?.addEventListener('button-release', () => {
                setGreenLedState(false);
            })
            // @ts-ignore
            redButton.current?.addEventListener('button-press', () => {
                setRedLedState(true);
            })
            // @ts-ignore
            redButton.current?.addEventListener('button-release', () => {
                setRedLedState(false);
            })
        });
    }

    const handleTextChange = (curValue?: string) => {
        setValue(curValue);
    }

    return (
        <>
            <div className="componentWrapper" id="container">
                {isLoading ? <Spinner /> : (
                    <>
                        <wokwi-arduino-uno />
                        <wokwi-pushbutton ref={greenButton} color="green" />
                        <wokwi-led color="green" value={greenLedState ? true : undefined}></wokwi-led>
                        <wokwi-led color="yellow" value={yellowLedState ? true : undefined}></wokwi-led>
                        <wokwi-led color="red" value={redLedState ? true : undefined}></wokwi-led>
                        <wokwi-pushbutton ref={redButton} color="red"></wokwi-pushbutton>
                    </>
                )}
            </div>

            <h3 className="subtitle">Write your code here:</h3>

            <Editor height="40vh" defaultLanguage="cpp" defaultValue={arduinoCode} onChange={handleTextChange} />

            <div className={classNames('buttonRun', { 'active': isActiveRun })} onClick={handleRunCode}>
                <span>Run</span>
            </div>
        </>
    )
}