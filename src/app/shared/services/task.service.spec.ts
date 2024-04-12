import { TaskService } from './task.service';

describe('TaskService', () => {
  const service: TaskService = new TaskService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
