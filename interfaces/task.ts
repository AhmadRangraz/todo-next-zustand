export enum taskStatus {
  Done = "done",
  NotDone = "notDone",
}

export interface task {
  id: string;
  title: string;
  status: taskStatus;
  description: string;
}
