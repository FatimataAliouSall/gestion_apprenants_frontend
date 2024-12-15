<template>
  <div class="container mt-4">
    <div class="header d-flex align-items-center justify-content-center mb-3 p-3">
      <h2 class="title">Ajouter un nouveau Apprénent</h2>
    </div>
    <form @submit.prevent="newStudent" class="styled-form">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Nom complet:</label>
          <input v-model="student.fullName" required class="form-control form-control-sm" />
          <div v-if="errors.fullName" class="text-danger">{{ errors.fullName }}</div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Tuteur:</label>
          <input v-model="student.tutor" required class="form-control form-control-sm" />
          <div v-if="errors.tutor" class="text-danger">{{ errors.tutor }}</div>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Email:</label>
        <input v-model="student.email" required type="email" class="form-control form-control-sm" />
        <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Téléphone:</label>
        <input v-model="student.phoneNumber" required class="form-control form-control-sm" />
        <div v-if="errors.phoneNumber" class="text-danger">{{ errors.phoneNumber }}</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Adresse:</label>
        <input v-model="student.address" required class="form-control form-control-sm" />
        <div v-if="errors.address" class="text-danger">{{ errors.address }}</div>
      </div>
      <div class="d-flex justify-content-between mt-4">
        <button type="submit" class="btn btn-primary flex-grow-1 me-2">
          Enregistrer
        </button>
        <button type="button" @click="router.push({ name: 'student-list' })" class="btn btn-cancel flex-grow-1">
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import router from "@/router";
import { storeStudent } from "@/stores/storeStudent";
import { ref } from "vue";
const store = storeStudent();
const student = ref({
  fullName: "",
  phoneNumber: "",
  tutor: "",
  address: "",
  email: "",
});
const errors = ref({
  fullName: null,
  tutor: null,
  email: null,
  phoneNumber: null,
  address: null,
});


const newStudent = async () => {
  try {
    await store.addStudent(
      student.value.fullName,
      student.value.email,
      student.value.tutor,
      student.value.address,
      student.value.phoneNumber
    );
    router.push({ name: "student-list" });
  } catch (error) {
    console.log("Erreur lors de l'ajout d'un apprenent: ", error);
    if (error.response && error.response.data.errors) {
      Object.keys(errors.value).forEach((key) => (errors.value[key] = null)); 

      error.response.data.errors.forEach((err) => {
        if (errors.value[err.param]) {
          errors.value[err.param] = err.msg;
        }
      });
    }
  }
};
  
</script>




<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.header {
  background-color: #f5f5dc;
  border-radius: 8px;
  padding: 10px 20px;
  text-align: center;
}

.title {
  font-size: 1.4rem;
  color: #218838;
}

.styled-form {
  background: white;
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-label {
  font-size: 0.9rem;
  color: #333;
}

.form-control-sm {
  border-radius: 5px;
  padding: 0.4rem 0.75rem;
  border: 1px solid #ddd;
}

.btn-primary {
  background-color: #218838;
  border-color: #218838;
  color: white;
  font-weight: bold;
}

.btn-primary:hover {
  background-color: #1e7e34;
  border-color: #1e7e34;
}

.btn-cancel {
  background-color: transparent;
  color: #218838;
  border: 1px solid #218838;
  font-weight: bold;
}

.btn-cancel:hover {
  background-color: #218838;
  color: white;
}
</style>
