export interface Task {
  id?: number;
  task?: string;
  isDone?: boolean;
  title: string;
  content: string;
  createdAt: any;
}

export enum TaskStatus {
  task = "Task",
  inprogress = "In progress",
  review = "Review",
  verified = "To verify",
  completed = "Completed",
}
