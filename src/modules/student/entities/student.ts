import {Entity} from "@/kernel/types";

export type Student = Entity<string> & {
    name: string,
    p_lastname: string,
    m_lastname:string,
    email:string,
    career: string,
    studentIdentifier: string
}