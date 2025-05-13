import { UseCase } from "@/kernel/contacts";
import { GetStudentsDto } from "../adapters/dto/get-students";
import { ResponseApi } from "@/kernel/types";
import { Student } from "../entities/student";
import { StudentRepository } from "./ports/student.repository";

export class GetStudentsInteractor implements UseCase<GetStudentsDto, ResponseApi<Student[]>>{
    constructor(private readonly studentRepository : StudentRepository){}
    
    execute(): Promise<ResponseApi<Student[]>> {
        return this.studentRepository.findAll();
    }

}