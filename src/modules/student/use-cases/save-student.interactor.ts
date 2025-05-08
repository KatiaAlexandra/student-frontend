import { UseCase } from "@/kernel/contacts";
import { SaveStudentDto } from "../adapters/dto/save-student";
import { ResponseApi } from "@/kernel/types";
import { Student } from "../entities/student";
import { StudentRepository } from "./ports/student.repository";

export class SaveStudentInteractor implements UseCase<SaveStudentDto, ResponseApi<Student>>{
    constructor(private readonly studentRepository : StudentRepository){}
    execute(payload: SaveStudentDto ): Promise<ResponseApi<Student>> {
        return this.studentRepository.save(payload);
    }
}