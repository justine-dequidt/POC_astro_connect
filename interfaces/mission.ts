import type { HardSkill } from "./hardSkill";

export interface Mission {
    clientName:string;
    sector: string;
    stratDate: string;
    endDate: string;
    duration: string;
    inProgress: boolean;
    context: string;
    task: Array<string>;
    technos: Array<HardSkill>;
}