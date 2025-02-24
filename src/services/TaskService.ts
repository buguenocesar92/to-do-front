import axios from '@/axiosConfig';
import type { TaskPayload } from '@/types/TaskTypes';

/**
 * Obtiene todas las tareas.
 */
export async function fetchTasks(): Promise<TaskPayload[]> {
  const response = await axios.get('/tasks');
  return response.data;
}

/**
 * Obtiene una tarea por ID.
 */
export async function fetchTask(id: number): Promise<TaskPayload> {
  const response = await axios.get(`/tasks/${id}`);
  return response.data;
}

/**
 * Crea una nueva tarea.
 */
export async function createTask(data: TaskPayload): Promise<TaskPayload> {
  const response = await axios.post('/tasks', data);
  return response.data;
}

/**
 * Actualiza una tarea existente.
 */
export async function updateTask(id: number, data: TaskPayload): Promise<TaskPayload> {
  const response = await axios.put(`/tasks/${id}`, data);
  return response.data;
}

/**
 * Elimina una tarea.
 */
export async function deleteTask(id: number): Promise<void> {
  await axios.delete(`/tasks/${id}`);
}
