<template>
  <div>
    <div class="row">
      <div class="col s6">
        <!-- PostForm -->
        <PostForm @taskCreated="addTask" :editingTask="editingTask" />
      </div>
      <div class="col s3" style="margin-left:20px;">
        <p>Limit number of tasks</p>
        <input type="number" name id v-model="taskLimit" />
        <button class="waves-effect waves-light btn" @click="setLimit">Set</button>
      </div>
    </div>
    <div class="row">
      <div class="col s6" v-for="(task, index) in tasks" :index="index" :item="task" :key="task.id">
        <div class="card">
          <div class="card-content">
            <h5 class="title blue-text text-darken-2">{{task.title}}</h5>
            <p class="description grey-text text-darken-2">{{task.description}}</p>
            <p class="created_at">
              <i>
                <b>Created at: {{task.created_at}}</b>
              </i>
            </p>
            <div class="status teal-text text-darken-2">
              <i>
                <b>Status: {{task.completed ? "Completed" : "Incomplete"}}</b>
              </i>
            </div>
          </div>
          <div class="card-action">
            <a href="#" class="waves-effect waves-light btn edit-btn" @click="editTask(task)">Edit</a>
            <a
              href="#"
              class="waves-effect waves-light btn delete-btn"
              @click="deleteTask(task.id)"
            >Delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskService from "../TaskService";
import PostForm from "../components/PostForm";
const taskService = new TaskService();
export default {
  name: "Home",
  components: {
    PostForm
  },
  data() {
    return {
      tasks: [],
      taskLimit: 6,
      editingTask: null
    };
  },
  methods: {
    addTask(task) {
      if (this.tasks.find(t => t.id === task.id)) {
        const index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks.splice(index, 1, task);
      } else this.tasks.unshift(task);
    },
    editTask(task) {
      this.editingTask = task;
    },
    async deleteTask(id) {
      try {
        await taskService.deleteTask(id);
        console.log("deleted");
        this.tasks = this.tasks.filter(t => t.id !== id);
      } catch (error) {
        console.log(error);
      }
    },
    async setLimit() {
      try {
        const res = await taskService.getTasksWithLimit(this.taskLimit);
        this.tasks = res.data.reverse();
      } catch (error) {
        console.log(error);
      }
    }
  },
  async created() {
    try {
      const res = await taskService.getAllTask();
      this.tasks = res.data.reverse();
      console.log(this.tasks);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.edit-btn {
  margin-right: 5px;
}
.delete-btn {
  background: rgb(219, 121, 121);
}
.description {
  margin: 10px !important;
}
</style>
