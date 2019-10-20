<template>
  <div>
    <form class="form" v-if="!loading" @submit.prevent="onSubmit">
      <div class="input-field">
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          v-model="title"
          :class="[(errors.length > 0) ? 'invalid' : 'validate']"
        />
        <span class="helper-text" data-error="Title must not empty"></span>
        <button
          class="btn waves-effect waves-light submit-btn"
          type="submit"
          name="action"
        >{{id ? "Update" : "Add"}}</button>
      </div>
    </form>
    <div class="progress" v-else>
      <div class="indeterminate"></div>
    </div>
  </div>
</template>

<script>
import TaskService from "../TaskService";
const taskService = new TaskService();
export default {
  name: "PostForm",
  data() {
    return {
      loading: false,
      title: "",
      errors: [],
      id: null
    };
  },
  props: {
    editingTask: Object
  },
  watch: {
    editingTask(task) {
      this.id = task.id;
      this.title = task.title;
    }
  },
  methods: {
    async onSubmit() {
      if (!this.validateForm()) {
        this.loading = false;
        return;
      }
      this.loading = true;
      const task = {
        userId: 1,
        title: this.title,
        completed: false,
        id: this.id
      };
      try {
        const res = await taskService.createTask(task);
        console.log(res.data);
        console.log("ok");
        this.$emit("taskCreated", res.data);
        this.loading = false;
        this.title = "";
        this.id = null;
      } catch (error) {
        console.log(error);
      }
    },
    validateForm() {
      this.errors = [];
      if (this.title.trim() === "") {
        this.errors.push("Title");
      }
      if (this.errors.length > 0) return false;
      return true;
    }
  }
};
</script>

<style scoped>
.form {
  margin: 20px;
}
.submit-btn {
  margin-top: 10px;
}
</style>
