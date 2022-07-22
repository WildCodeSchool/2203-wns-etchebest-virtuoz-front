export interface Task {
  id: number;
  task: string;
  isDone: boolean;
}

export enum TaskStatus {
  task = "Task",
  inprogress = "In progress",
  review = "Review",
  verified = "Verified",
  completed = "Completed",
}
