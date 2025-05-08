<template>
  <div>
    <b-modal id="modal-2" centered hide-footer hide-header title="BootstrapVue">
      <div>
        <h3>Modificar Estudiante</h3>
        <form class="my-4" action="">
          <div class="form-group">
            <label for="">Nombre: <span class="text-danger">*</span></label>
            <input v-model="studentSelected.name" placeholder="Nombre" type="text" class="form-control">
          </div>
          <label for="">Apellidos: <span class="text-danger">*</span></label>
          <div class="row">
            <div class="col-6">
              <input v-model="studentSelected.p_lastname" placeholder="Paterno" type="text" class="form-control">
            </div>
            <div class="col-6">
              <input v-model="studentSelected.m_lastname" placeholder="Materno" type="text" class="form-control">
            </div>
          </div>
          <div class="form-group">
            <label for="">Carrera: <span class="text-danger">*</span></label>
            <input v-model="studentSelected.career" placeholder="Carrera" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label for="">Matricula: <span class="text-danger">*</span></label>
            <input v-model="studentSelected.studentIdentifier" placeholder="Matricula" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label for="">Correo: <span class="text-danger">*</span></label>
            <input v-model="studentSelected.email" placeholder="example@domain.com" type="text" class="form-control">
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

export default Vue.extend({
  name: 'updateStudentModal',
  props: {
    studentSelected: {
      type: Object,
      required: true
    }
  },
  methods: {
    async updateStudent() {
      const controller = new StudentController();
      const response = await controller.update(this.studentSelected);

      this.$bvModal.hide("modal-2");
      this.$emit("findAll");
    }
  }
})
</script>