import { useState, useRef } from "react";
import classNames from 'classnames';
import { Spinner } from "../../../ui-base/spinner/Spinner";
import "./../ArduinoPage.styled.scss";
import { buildHex } from "../utils";
import { AVRRunner } from "../execute";
import Editor from '@monaco-editor/react';
import { WS2812Controller } from "../ws2812";

export const LessonFive = () => {
    const [values, setValues] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isActiveRun, setIsActiveRun] = useState(false);
    const segment = useRef(null);

    const NeoMatrixController: WS2812Controller[] = [new WS2812Controller(9 * 9)]

    const arduinoCode = `
    byte leds[] = {13, 12, 11, 10};
    void setup() {
        Serial.begin(115200);
        for (byte i = 0; i < sizeof(leds); i++) {
            pinMode(leds[i], OUTPUT);
        }
    }

    int i = 0;
    void loop() {
        digitalWrite(leds[i], HIGH);
        delay(250);
        digitalWrite(leds[i], LOW);
        i = (i + 1) % sizeof(leds);
    }
    `;

    const [value, setValue] = useState<string | undefined>(arduinoCode);

    const handleRunCode = async () => {
        setIsLoading(true);
        const hex = await buildHex(value!);
    
        if (!hex) return;
        const runner = new AVRRunner(hex);

        runner.portB.addListener((val) => {
            setValues(`[${val & 1},${val & 2},${val & 4},${val & 16},${val & 32},${val & 64},${val & 128},${val & 256}]`)
        });
        setIsLoading(false);
        setIsActiveRun(true);
        
        runner.execute(() => {});
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
                        <wokwi-neopixel-matrix rows={9} cols={9} />
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