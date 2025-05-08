import { ResponseApi } from "@/kernel/types";
import { GetStudentsInteractor } from "../use-cases/get-students.interactor";
import { StudentRepository } from "../use-cases/ports/student.repository";
import { StudentStorageGateway } from "./students.storage.gateway";
import { Student } from "../entities/student";

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
}