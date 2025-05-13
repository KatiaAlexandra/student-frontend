<template>
    <div>
      <div class="container-fluid mt-3">
        <div class="row">
          <div class="col-md-12">
            <section class="container-fluid">
              <div class="row d-flex justify-content-between align-items-center">
                <h3>Estudiantes</h3>
                <button class="btn btn-success" v-b-modal.modal-1>Registrar estudiante</button>
              </div>
              <div class="row d-flex justify-content-start mt-2">
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <input v-model="search" placeholder="Buscar..." class="form-control"/>
                </div>
              </div>

              <div class="row mt-3" >
                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3"  v-for="student in filteredResults" :key="student.id">
                  <b-card style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
                    <h4>{{`${student.name} ${student.p_lastname} ${student.m_lastname}`}}</h4>
                    <h5>{{student.studentIdentifier}}</h5>
                    <b-card-text>
                      {{student.career}}
                    </b-card-text>
                    <b-card-text>{{student.email}}</b-card-text>
                    <button class="btn btn-info" @click="findByStudentIdentifier(student.studentIdentifier)"
                            v-b-modal.modal-2>
                      <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
                    </button>
                    <button class="btn btn-danger mx-2" @click="showDeleteAlert(student)"><b-icon icon="trash-fill" aria-hidden="true"></b-icon></button>
                  </b-card>
                </div>
                <div v-if="filteredResults.length<1" class="d-flex justify-content-center align-items-center col-12">
                  <img src="https://creator.nightcafe.studio/users/WMeQyeIVUoeWnMMF7UPlBrEMDLI3/uploads/yPhWy8uILEbiQAvy4EG2.png">
                </div>
                <div v-if="filteredResults.length<1" class="d-flex justify-content-center align-items-center col-12">
                  <h1>No hay resultados para "{{search}}"</h1>
                </div>

              </div>
            </section>
          </div>
        </div>
        <AddStudentModal @findAll="findAll" />
        <updateStudentModal :studentSelected="student" @findAll="findAll" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import { StudentController } from '../students.controller';
  import {Student} from "@/modules/student/entities/student";
  import AddStudentModal from "@/modules/student/adapters/view/AddStudent.modal.vue";
  import updateStudentModal from "@/modules/student/adapters/view/UpdateStudent.modal.vue";
  import {showConfirmation, showSuccessToast, showErrorToast} from "@/kernel/functions";


  export default Vue.extend({
    name: 'StudentsView',
    components:{
      AddStudentModal, updateStudentModal
    },
    data() {
      return {
        students: [] as Student[],
        student:{} as Student,
        search: ''
      };
    },
    methods: {
      async findAll() {
        const controller = new StudentController();
        const response = await controller.findAll();
        this.students = response.result || [];
      },

      async findByStudentIdentifier(payload: string) {
        const controller = new StudentController();
        const response = await controller.findByStudentIdentifier(payload);
        this.student = response.result!;
      },

      async showDeleteAlert(student: Student){
        showConfirmation('Eliminar', `¿Esta segur@ de eliminar a ${student.name}`, 'question', ()=>this.deleteStudent(student))
      },
      async deleteStudent(student: Student){
        try{
          const controller = new StudentController()
          await controller.delete(student.id as string);
          await this.findAll();
          showSuccessToast({title:"Eliminación exitosa", text:"Se ha eliminado al estudiante exitosamente", timer:3000});
        }catch (e) {
          console.log(e)
         showErrorToast({title:"Ocurrió un error", text: "Ocurrió un error al intentar eliminar al estudiante", timer:3000})
        }
      }
    },
    computed: {
      filteredResults(): Student[] {
        return this.students.filter((student: Student) =>
            Object.values(student)
                .join(' ')
                .toLowerCase()
                .includes(this.search.toLowerCase())
        );
      }
    },
    mounted() {
      this.findAll();
    },
  });
  </script>
  