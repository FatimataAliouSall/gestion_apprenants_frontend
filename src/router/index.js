import { createRouter, createWebHistory } from "vue-router";
import StudentList from "../views/student-management/StudentList.vue";
import StudentAdd from "@/views/student-management/StudentAdd.vue";
import StudentEddit from "@/views/student-management/StudentEddit.vue";
import StudentShow from "@/views/student-management/StudentShow.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "student-list",
      component: StudentList,
    },
    // {
    //   path: "/student",
    //   name: "student-list",
    //   component: StudentList,
    // },
    {
      path: "/student-add",
      name: "student-add",
      component: StudentAdd,
    },
    {
      path: "/student-eddit/:id",
      name: "student-eddit",
      component: StudentEddit,
    },
    {
      path: "/student-show/:id",
      name: "student-show",
      component: StudentShow,
    },
  ],
});

export default router;
