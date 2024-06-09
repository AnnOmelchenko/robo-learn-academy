import { parse } from "intel-hex";
import { Buffer } from 'buffer';
import { CPU, AVRIOPort, portDConfig } from "avr8js";
import { useCompileArduino } from "../../api/lessons/queries/useCompileArduino";

interface CompiledData {
    port: AVRIOPort
    cpu: CPU
}

export const buildHex = async (value: string): Promise<string | undefined> => {
    const result = await useCompileArduino(value);

    const { hex, stderr } = await result.json();

    if (!hex) {
      alert(stderr);
      return;
    }

    return hex;
}

export const compile = async (value: string): Promise<CompiledData | undefined> => {
    const hex = await buildHex(value);
    if (!hex) return;

    const buff = Buffer.from(hex, "utf-8");
    const { data } = parse(buff);
    const progData = new Uint8Array(data);
    
    const cpu = new CPU(new Uint16Array(progData.buffer));

    const port = new AVRIOPort(cpu, portDConfig);

    return { port, cpu };
}

export function loadHex(source: string, target: Uint8Array) {
    for (const line of source.split('\n')) {
      if (line[0] === ':' && line.substr(7, 2) === '00') {
        const bytes = parseInt(line.substr(1, 2), 16);
        const addr = parseInt(line.substr(3, 4), 16);
        for (let i = 0; i < bytes; i++) {
          target[addr + i] = parseInt(line.substr(9 + i * 2, 2), 16);
        }
      }
    }
}
