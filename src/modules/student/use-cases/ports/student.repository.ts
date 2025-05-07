import {ResponseApi} from "@/kernel/types";
import { Student } from "../../entities/student";
import {SaveStudentDto} from "@/modules/student/adapters/dto/save-student";

export interface StudentRepository{
    findAll(): Promise<ResponseApi<Student>>;
    findByStudentIdentifier(payload: string): Promise<ResponseApi<Student>>;
    save(payload: SaveStudentDto): Promise<ResponseApi<Student>>;
}