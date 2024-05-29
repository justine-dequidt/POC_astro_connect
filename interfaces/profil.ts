import type { Mission } from "./mission";
import type { SoftSkill } from "./softSkill";
import type { Diploma } from "./diploma";
import type { Langue } from "./langue";

export interface Profil {
    title:string;
    startDate: number;
    mission: Array<Mission>;
    softSkill: Array<SoftSkill>;
    diploma: Array<Diploma>;
    langue: Array<Langue>;
}