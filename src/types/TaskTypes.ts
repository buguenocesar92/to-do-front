export interface TaskPayload {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
}
