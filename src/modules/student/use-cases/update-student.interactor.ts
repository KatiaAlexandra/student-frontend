import { UseCase } from "@/kernel/contacts";
import { UpdateStudentDto } from "../adapters/dto/update-student";
import { ResponseApi } from "@/kernel/types";
import { Student } from "../entities/student";
import { StudentRepository } from "./ports/student.repository";

export class UpdateStudentInteractor implements UseCase<UpdateStudentDto, ResponseApi<Student>>{
    constructor(private readonly studentRepository : StudentRepository){}
    execute(payload: UpdateStudentDto): Promise<ResponseApi<Student>> {
        return this.studentRepository.update(payload);
    }
}