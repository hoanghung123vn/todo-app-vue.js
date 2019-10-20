<template>
  <div>
    <form class="form" v-if="!loading" @submit.prevent="onSubmit">
      <div class="input-field">
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          v-model="title"
          :class="[(errors.title) ? 'invalid' : 'validate']"
        />
        <span class="helper-text" data-error="Title must not empty"></span>
      </div>
      <div class="input-field">
        <label for="description">Description</label>
        <input
          type="text"
          name="description"
          v-model="description"
          :class="[(errors.description) ? 'invalid' : 'validate']"
        />
        <span class="helper-text" data-error="Description must not empty"></span>
      </div>
      <button
        class="btn waves-effect waves-light submit-btn"
        type="submit"
        name="action"
      >{{id ? "Update" : "Add"}}</button>
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
      description: "",
      errors: {
        title: 0,
        description: 0
      },
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
      this.description = task.description;
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
        id: this.id,
        title: this.title,
        description: this.description,
        completed: false,
        created_at: new Date().toDateString()
      };
      try {
        const res = await taskService.createTask(task);
        console.log(res.data);
        console.log("ok");
        this.$emit("taskCreated", res.data);
        this.loading = false;
        this.title = "";
        this.id = null;
        this.description = "";
      } catch (error) {
        console.log(error);
      }
    },
    validateForm() {
      this.errors = {};
      if (this.title.trim() === "") {
        this.errors.title = 1;
      }
      if (this.description.trim() === "") {
        this.errors.description = 1;
      }
      if (Object.keys(this.errors).length > 0) return false;
      return true;
    }
  }
};
</script>

<style scoped>
.form {
  margin: 20px;
}
</style>
