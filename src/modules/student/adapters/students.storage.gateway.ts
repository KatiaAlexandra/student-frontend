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
    
    async findByStudentIdentifier(payload: string): Promise<ResponseApi<Student>> {
        return await fetch(`http://localhost:8081/api/student/${payload}`)
            .then(data=>data.json()).then((student)=>{
                return{
                    code:200,
                    error:false,
                    message:'OK',
                    entity:student
                }as ResponseApi<Student>;
            }).catch(()=>this.getError());

    }
    async save(payload: SaveStudentDto): Promise<ResponseApi<Student>> {
        return await fetch('http://localhost:8081/api/student', {
            method:'POST',
            body:JSON.stringify(payload),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(data=>data.json()).then(()=>{
            return{
                code:200,
                error:false,
                message:'STUDENT REGISTERED'
            }as ResponseApi<Student>
        }).catch(()=>this.getError());
    }
    async update(payload: UpdateStudentDto): Promise<ResponseApi<Student>> {
        return await fetch('http://localhost:8081/api/student',{
            method:'PUT',
            body: JSON.stringify(payload),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then(()=>{
            return {
                code:200,
                error:false,
                message:'STUDENT UPDATED'
            }as ResponseApi<Student>
        }).catch(()=>this.getError())
    }
    async delete(payload: string): Promise<ResponseApi<Student>> {
        return await fetch(`http://localhost:8081/api/student/${payload}`, {
            method:'DELETE'
        }).then(data=>data.json())
            .then(()=>{
                return {
                    code:200,
                    error:false,
                    message:'OK'
                }as ResponseApi<Student>
            }).catch(()=>this.getError())
    }
    
}