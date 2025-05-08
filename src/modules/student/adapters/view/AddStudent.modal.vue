<template>
  <div>
    <b-modal id="modal-1" centered hide-footer hide-header title="BootstrapVue">
      <div>
        <h3>Agregar Estudiante</h3>
        <form class="my-4" action="">
          <div class="form-group">
            <label for="">Nombre: <span class="text-danger">*</span></label>
            <input v-model="student.name" placeholder="Nombre" type="text" class="form-control">
          </div>
          <label for="">Apellidos: <span class="text-danger">*</span></label>
          <div class="row">
            <div class="col-6">
              <input v-model="student.p_lastname" placeholder="Paterno" type="text" class="form-control">
            </div>
            <div class="col-6">
              <input v-model="student.m_lastname" placeholder="Materno" type="text" class="form-control">
            </div>
          </div>
          <div class="form-group">
            <label for="">Carrera: <span class="text-danger">*</span></label>
            <input v-model="student.career" placeholder="Carrera" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label for="">Matricula: <span class="text-danger">*</span></label>
            <input v-model="student.studentIdentifier" placeholder="Matricula" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label for="">Correo: <span class="text-danger">*</span></label>
            <input v-model="student.email" placeholder="example@domain.com" type="text" class="form-control">
          </div>
        </form>
      </div>
      <div class="text-right">
        <button class="btn btn-secondary mr-2" @click="$bvModal.hide('modal-1')">Cerrar</button>
        <button class="btn btn-primary" @click="saveUser()">Guardar</button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {StudentController} from "@/modules/student/adapters/students.controller";
import { SaveStudentDto } from '../dto/save-student';
export default Vue.extend({
  name: 'AddStudentModal',
  data() {
    return {
      student: {} as SaveStudentDto
    }
  },
  methods: {
    async saveUser() {
      const controller = new StudentController();
      const response = await controller.save(this.student);

      this.$bvModal.hide("modal-1");
      this.$emit("findAll");
    }
  }
})
</script>