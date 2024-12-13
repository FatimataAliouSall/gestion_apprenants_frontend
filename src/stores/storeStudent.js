import { defineStore } from "pinia";
import HTTP from "@/config.axios";
import { ref } from "vue";

export const storeStudent = defineStore("student", () => {
  const students = ref([]);
  const loadData = async () => {
    try {
      const { data } = await HTTP.get("students/");
      const result = data.result;
      students.value = result;
      return result;
    } catch (error) {
      throw error;
    }
  };
  const findStudent = async (id) => {
    try {
      const { data } = await HTTP.get(`student/${id}`);
      const result = data.result;
      console.log(result);
      await loadData();
      return result;
    } catch (error) {
      throw error;
    }
  };
  const addStudent = async (fullName, email, tutor, address, phoneNumber) => {
    try {
      const result = await HTTP.post("student/", {
        fullName,
        email,
        tutor,
        address,
        phoneNumber,
      });
      await loadData();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const updateStudent = async (
    id,
    fullName,
    email,
    tutor,
    address,
    phoneNumber
  ) => {
    try {
      const { data } = await HTTP.put(`student/${id}`, {
        fullName,
        email,
        tutor,
        address,
        phoneNumber,
      });
      const result = data.result;
      await loadData();

      return result;
    } catch (error) {
      throw error;
    }
  };

  const destroy = async (id) => {
    try {
      await HTTP.delete(`student/${id}`);

      await loadData();
    } catch (error) {
      throw error;
    }
  };
  return { students, loadData, addStudent, findStudent, updateStudent,destroy };
});
