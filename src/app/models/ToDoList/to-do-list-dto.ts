export interface ToDoListDto {
  id?: number;
  name: string;
  description: string;
  statusName?: 'InProgress' | 'Done';
}
