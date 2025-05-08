import { ResponseApi } from "@/kernel/types";
import { GetStudentsInteractor } from "../use-cases/get-students.interactor";
import { StudentRepository } from "../use-cases/ports/student.repository";
import { StudentStorageGateway } from "./students.storage.gateway";
import { Student } from "../entities/student";
import {GetStudentInteractor} from "@/modules/student/use-cases/get-student.interactor";
import {SaveStudentDto} from "@/modules/student/adapters/dto/save-student";
import {SaveStudentInteractor} from "@/modules/student/use-cases/save-student.interactor";
import {UpdateStudentDto} from "@/modules/student/adapters/dto/update-student";
import {UpdateStudentInteractor} from "@/modules/student/use-cases/update-student.interactor";
import {DeleteStudentInteractor} from "@/modules/student/use-cases/delete-student.interactor";

export class StudentController{
    findAll(){
        const repo : StudentRepository = new StudentStorageGateway();
        const interactor : GetStudentsInteractor = new GetStudentsInteractor(repo);
        try{
            return interactor.execute();
        }catch(err){
            return{ 
                code: 500,
                message: 'INTERNAL ERROR IN CONTROLLER'
            }as ResponseApi<Student>;
        }
    }

    findByStudentIdentifier(payload: string){
        const repo: StudentRepository= new StudentStorageGateway();
        const interactor : GetStudentInteractor = new GetStudentInteractor(repo);

        try{
            return interactor.execute(payload);
        }catch (err){
            return{
                code:500,
                message:'INTERNAL ERROR IN CONTROLLER'
            }as ResponseApi<Student>
        }
    }

    save(payload: SaveStudentDto){
        const repo: StudentRepository = new StudentStorageGateway();
        const interactor : SaveStudentInteractor = new SaveStudentInteractor(repo);

        try{
            return interactor.execute(payload);
        }catch (err){
            return {
                code:500,
                message:'INTERNAL ERROR IN CONTROLLER'
            }as ResponseApi<Student>;
        }
    }

    update(payload: UpdateStudentDto){
        const repo: StudentRepository = new StudentStorageGateway();
        const interactor : UpdateStudentInteractor = new UpdateStudentInteractor(repo);

        try{
            return interactor.execute(payload);
        }catch (err) {
            return{
                code:500,
                message:'INTERNAL ERROR IN CONTROLLER'
            }as ResponseApi<Student>
        }
    }

    delete(payload:string){
        const repo: StudentRepository = new StudentStorageGateway();
        const interactor: DeleteStudentInteractor = new DeleteStudentInteractor(repo);

        try{
            return interactor.execute(payload);
        }catch (err){
            return{
                code:500,
                message:'INTERNAL ERROR IN CONTROLLER'
            }as ResponseApi<Student>
        }
    }
}