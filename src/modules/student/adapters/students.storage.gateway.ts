import { ResponseApi } from "@/kernel/types";
import { StudentRepository } from "../use-cases/ports/student.repository";
import { Student } from "../entities/student";
import { SaveStudentDto } from "./dto/save-student";
import { UpdateStudentDto } from "./dto/update-student";
import {handleRequest} from "@/config/http-client.gateway";

export class StudentStorageGateway implements StudentRepository{

    async findAll(): Promise<ResponseApi<Student[]>>{
        return handleRequest<Student[]>('get', '/student');
    }

    delete(payload: string): Promise<ResponseApi<Student>> {
        return handleRequest<Student>('delete', `student/${payload}`)
    }

    findByStudentIdentifier(payload: string): Promise<ResponseApi<Student>> {
        return handleRequest<Student>('get', `/student/${payload}`)
    }

    save(payload: SaveStudentDto): Promise<ResponseApi<Student>> {
        return handleRequest<Student, SaveStudentDto>('post', '/student', payload)
    }

    update(payload: UpdateStudentDto): Promise<ResponseApi<Student>> {
        return handleRequest<Student, UpdateStudentDto>('put', '/student', payload)
    }

    
}