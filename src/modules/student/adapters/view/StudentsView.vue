<template>
    <div>
      <div class="container-fluid mt-3">
        <div class="row">
          <div class="col-md-12">
            <section>
              <div class="row d-flex justify-content-end mr-5">
                <button class="btn btn-success" v-b-modal.modal-1>Registrar estudiante</button>
              </div>
              <div class="row mt-4 d-flex justify-content-center align-items-center">
                <div class="col-md-10">
                  <b-table
                    striped
                    hover
                    :fields="fields"
                    :items="students"
                    :per-page="7"
                    :current-page="currentPageMain"
                  >
                    <template #cell(actions)="data">
                      <button class="btn btn-info" @click="findByStudentIdentifier(data.item.studentIdentifier)"
                              v-b-modal.modal-2>Actualizar</button>
                      <button class="btn btn-danger mx-2" @click="findByStudentIdentifier(data.item.studentIdentifier)"
                              v-b-modal.modal-3>Eliminar</button>
                    </template>
                  </b-table>
                  <b-pagination
                    v-model="currentPageMain"
                    :total-rows="students.length"
                    :per-page="7"
                    aria-controls="my-table"
                  ></b-pagination>
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
        fields: [
          { key: 'name', label: 'Nombre', sortable: true },
          { key: 'p_lastname', label: 'Primer apellido', sortable: true },
          { key: 'm_lastname', label: 'Segundo apellido', sortable: true },
          { key: 'career', label: 'Carrera', sortable: true },
          { key: 'email', label: 'Correo', sortable: true },
          {key: 'studentIdentifier', label:'Matricula', sortable:true},
          {key:'actions', label:'Acciones'}
        ],
        students: [] as Student[],
        student:{} as Student,
        currentPageMain: 1,
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
  