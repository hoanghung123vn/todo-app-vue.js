import axios from 'axios';

const apiBaseURL = 'http://localhost:3000';

export default class TaskService {
  getAllTask() {
    return axios.get(`${apiBaseURL}/todos`);
  }

  getTasksWithLimit(number) {
    return axios.get(`${apiBaseURL}/todos`, {
      params: {
        _limit: number
      }
    });
  }

  createTask(post) {
    if (post.id) {
      return axios.put(`${apiBaseURL}/todos/${post.id}`, post);
    } else return axios.post(`${apiBaseURL}/todos`, post);
  }

  deleteTask(id) {
    return axios.delete(`${apiBaseURL}/todos/${id}`);
  }
}
