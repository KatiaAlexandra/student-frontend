import {ResponseApi} from "@/kernel/types";
import { Student } from "../../entities/student";
import {SaveStudentDto} from "@/modules/student/adapters/dto/save-student";
import { UpdateStudentDto } from "../../adapters/dto/update-student";

export interface StudentRepository{
    findAll(): Promise<ResponseApi<Student[]>>;
    findByStudentIdentifier(payload: string): Promise<ResponseApi<Student>>;
    save(payload: SaveStudentDto): Promise<ResponseApi<Student>>;
    update(payload: UpdateStudentDto) : Promise <ResponseApi<Student>>;
    delete(payload: string): Promise<ResponseApi<Student>>;
}