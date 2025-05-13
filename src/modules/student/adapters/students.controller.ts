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

    findAll(): Promise<ResponseApi<Student[]>>{
        const studentRepository : StudentRepository = new StudentStorageGateway();
        const interactor = new GetStudentsInteractor(studentRepository);
        return interactor.execute();

    }

    save(student : SaveStudentDto): Promise<ResponseApi<Student>>{
        const studentRepository: StudentRepository = new StudentStorageGateway();
        const interactor = new SaveStudentInteractor(studentRepository);
        return interactor.execute(student);
    }

    delete(id: string): Promise<ResponseApi<Student>>{
        const studentRepository: StudentRepository = new StudentStorageGateway();
        const interactor: DeleteStudentInteractor = new DeleteStudentInteractor(studentRepository);
        return interactor.execute(id);
    }

    findByStudentIdentifier(id: string): Promise<ResponseApi<Student>>{
        const studentRepository : StudentRepository = new StudentStorageGateway();
        const interactor :GetStudentInteractor = new GetStudentInteractor(studentRepository);
        return interactor.execute(id);
    }

    update(student: UpdateStudentDto) : Promise<ResponseApi<Student>>{
        const studentRepository : StudentRepository =  new StudentStorageGateway();
        const interactor : UpdateStudentInteractor = new UpdateStudentInteractor(studentRepository);
        return interactor.execute(student);
    }
}