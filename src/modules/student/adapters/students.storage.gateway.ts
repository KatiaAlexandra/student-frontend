import { ResponseApi } from "@/kernel/types";
import { StudentRepository } from "../use-cases/ports/student.repository";
import { Student } from "../entities/student";
import { SaveStudentDto } from "./dto/save-student";
import { UpdateStudentDto } from "./dto/update-student";

export class StudentStorageGateway implements StudentRepository{
    
    getError(): ResponseApi<Student>{
        return {
            code: 500, 
            error: true,
            message: 'INTERNAL ERROR SERVER'
        }as ResponseApi<Student>;
    }

    async findAll(): Promise<ResponseApi<Student>> {
        return await fetch('http://localhost:8081/api/student').then(data => data.json())
        .then((students) => {
            return {
                code:200, 
                message:'OK',
                entities: students
            } as ResponseApi<Student>;
        }).catch(()=>this.getError());
    }
    
    findByStudentIdentifier(payload: string): Promise<ResponseApi<Student>> {
        throw new Error("Method not implemented.");
    }
    save(payload: SaveStudentDto): Promise<ResponseApi<Student>> {
        throw new Error("Method not implemented.");
    }
    update(payload: UpdateStudentDto): Promise<ResponseApi<Student>> {
        throw new Error("Method not implemented.");
    }
    delete(payload: string): Promise<ResponseApi<Student>> {
        throw new Error("Method not implemented.");
    }
    
}