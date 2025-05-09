<template>
    <div>
      <div class="container-fluid mt-3">
        <div class="row">
          <div class="col-md-12">
            <section>
              <div class="row d-flex justify-content-between align-items-center container-fluid">
                <h3>Gestión de Estudiantes</h3>
                <button class="btn btn-success" v-b-modal.modal-1>Registrar estudiante</button>
              </div>

              <div class="row mt-3" >
                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3"  v-for="student in students" :key="student.id">
                  <b-card style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
                    <h4>{{`${student.name} ${student.p_lastname}`}}</h4>
                    <h5>{{student.studentIdentifier}}</h5>
                    <b-card-text>
                      {{student.career}}
                    </b-card-text>
                    <b-card-text>{{student.email}}</b-card-text>
                    <button class="btn btn-info" @click="findByStudentIdentifier(student.studentIdentifier)"
                            v-b-modal.modal-2>
                      <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
                    </button>
                    <button class="btn btn-danger mx-2" @click="findByStudentIdentifier(student.studentIdentifier)"
                            v-b-modal.modal-3><b-icon icon="trash-fill" aria-hidden="true"></b-icon></button>
                  </b-card>
                </div>
              </div>
            </section>
          </div>
        </div>
        <AddStudentModal @findAll="findAll" />
        <updateStudentModal :studentSelected="student" @findAll="findAll" />
        <delete-student-modal :studentSelected="student" @findAll="findAll" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import { StudentController } from '../students.controller';
  import {Student} from "@/modules/student/entities/student";
  import AddStudentModal from "@/modules/student/adapters/view/AddStudent.modal.vue";
  import updateStudentModal from "@/modules/student/adapters/view/UpdateStudent.modal.vue";
  import DeleteStudentModal from "@/modules/student/adapters/view/DeleteStudent.modal.vue";
  
  export default Vue.extend({
    name: 'StudentsView',
    components:{
      AddStudentModal, updateStudentModal, DeleteStudentModal
    },
    data() {
      return {
        students: [] as Student[],
        student:{} as Student
      };
    },
    methods: {
      async findAll() {
        const controller = new StudentController();
        const response = await controller.findAll();
        this.students = response.entities || [];
      },
      async findByStudentIdentifier(payload: string) {
        const controller = new StudentController();
        const response = await controller.findByStudentIdentifier(payload);
        this.student = response.entity!;
        console.log(this.student);
      }
    },
    mounted() {
      this.findAll();
    },
  });
  </script>
  