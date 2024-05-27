import type { Mission } from "./mission";
import type { SoftSkill } from "./softSkill";
import type { Diploma } from "./diploma";

export interface Profil {
    title:string;
    xp: number;
    mission: Array<Mission>;
    softSkill: Array<SoftSkill>;
    diploma: Array<Diploma>;
}