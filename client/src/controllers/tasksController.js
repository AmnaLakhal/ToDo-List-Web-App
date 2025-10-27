import { api } from '../services/api'
import { authModel } from '../models/auth'

export const tasksController = {
  async list() { 
    const result = await api.listTasks(authModel.getToken());
    console.log('Tasks list:', result);
    return result;
  },
  async create(title) { return api.createTask(authModel.getToken(), title) },
  async toggle(id, completed) { 
    console.log('TasksController toggle:', { id, completed, token: authModel.getToken()?.substring(0, 20) + '...' });
    const result = await api.updateTask(authModel.getToken(), id, { completed });
    console.log('TasksController toggle result:', result);
    return result;
  },
  async rename(id, title) { return api.updateTask(authModel.getToken(), id, { title }) },
  async remove(id) { return api.deleteTask(authModel.getToken(), id) },
}
