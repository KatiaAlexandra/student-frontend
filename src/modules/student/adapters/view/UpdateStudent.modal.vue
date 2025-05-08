<template>
  <div>
    <b-modal id="modal-2" centered hide-footer hide-header title="BootstrapVue" @hidden="resetForm">
      <div>
        <h3>Modificar Estudiante</h3>
        <form class="my-4" action="">
          <div class="form-group">
            <label for="">Nombre: <span class="text-danger">*</span></label>
            <input v-model="editedStudent.name" placeholder="Nombre" type="text" class="form-control">
          </div>
          <label for="">Apellidos: <span class="text-danger">*</span></label>
          <div class="row">
            <div class="col-6">
              <input v-model="editedStudent.p_lastname" placeholder="Paterno" type="text" class="form-control">
            </div>
            <div class="col-6">
              <input v-model="editedStudent.m_lastname" placeholder="Materno" type="text" class="form-control">
            </div>
          </div>
          <div class="form-group">
            <label for="">Carrera: <span class="text-danger">*</span></label>
            <input v-model="editedStudent.career" placeholder="Carrera" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label for="">Matricula: <span class="text-danger">*</span></label>
            <input v-model="editedStudent.studentIdentifier" placeholder="Matricula" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label for="">Correo: <span class="text-danger">*</span></label>
            <input v-model="editedStudent.email" placeholder="example@domain.com" type="text" class="form-control">
          </div>
        </form>
      </div>
      <div class="text-right">
        <button class="btn btn-secondary mr-2" @click="$bvModal.hide('modal-2')">Cerrar</button>
        <button class="btn btn-primary" @click="updateStudent()">Modificar</button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-console */
import Vue from 'vue';
import {StudentController} from "@/modules/student/adapters/students.controller";
import { UpdateStudentDto } from '../dto/update-student';

export default Vue.extend({
  name: 'updateStudentModal',
  props: {
    studentSelected: {
      type: Object,
      required: true
    }
  },
    data() {
  return {
    editedStudent: {
      id:"",
      name: "",
      p_lastname: "",
      m_lastname:"",
      email:"",
      career: "",
      studentIdentifier: ""
    } as UpdateStudentDto
  };
},
watch: {
  studentSelected: {
    immediate: true,
        handler(newVal){
      this.editedStudent={...newVal};
    }
  }
},
  methods: {
    async updateStudent() {
      const controller = new StudentController();
      await controller.update(this.editedStudent);

      this.$bvModal.hide("modal-2");
      this.$emit("findAll");
    },

    resetForm() {
      this.editedStudent ={
        id:"",
        name: "",
        p_lastname: "",
        m_lastname:"",
        email:"",
        career: "",
        studentIdentifier: ""
      }
    }
  }
})
</script>