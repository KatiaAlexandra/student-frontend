<template>
    <div>
      <div class="container-fluid mt-3">
        <div class="row">
          <div class="col-md-12">
            <section class="card">
              <div class="row mt-4">
                <div class="col-md-12">
                  <b-table
                    striped
                    hover
                    :fields="fields"
                    :items="students"
                    :per-page="7"
                    :current-page="currentPageMain"
                  >
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
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import { StudentController } from '../students.controller';
  import { Student } from '../../entities/students';
  
  export default Vue.extend({
    name: 'StudentsView',
    data() {
      return {
        fields: [
          { key: 'name', label: 'Nombre', sortable: true },
          { key: 'p_lastname', label: 'Primer apellido', sortable: true },
          { key: 'm_lastname', label: 'Segundo apellido', sortable: true },
          { key: 'career', label: 'Carrera', sortable: true },
          { key: 'email', label: 'Correo', sortable: true },
          {key: 'studentIdentifier', label:'Matricula', sortable:true}
        ],
        students: [] as Student[],
        currentPageMain: 1,
      };
    },
    methods: {
      async findAll() {
        const controller = new StudentController();
        const response = await controller.findAll();
        this.students = response.entities || [];
        console.log(this.students);
        
      },
    },
    mounted() {
      this.findAll();
    },
  });
  </script>
  