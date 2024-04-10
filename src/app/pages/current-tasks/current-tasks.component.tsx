import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Task, TaskService } from "../../shared";
import { ReactWrapperModule } from "@iapps/ng-dhis2-ui";
import React, { useEffect, useState } from "react";
import { CircularLoader, Center, Chip } from "@dhis2/ui";
import { TaskList } from "./components";

@Component({
  selector: "app-current-tasks",
  templateUrl: "./current-tasks.component.html",
  styleUrls: ["./current-tasks.component.scss"],
  standalone: true,
  imports: [CommonModule, ReactWrapperModule],
  providers: [TaskService],
})
export class CurrentTasksComponent {
  taskService = inject(TaskService);

  TaskList = () => {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
      const taskSubscription = this.taskService.get().subscribe({
        next: (tasks) => {
          setLoading(false);
          setTasks(tasks);
        },
        error: (error) => {},
      });

      return () => {
        taskSubscription.unsubscribe();
      };
    }, []);

    return (
      <>
        {loading ? (
          <div className="task-loader">
            <Center>
              <CircularLoader small />
            </Center>
          </div>
        ) : (
          <>
            <div className="task-list-container">
              <TaskList tasks={tasks} />
            </div>
          </>
        )}
      </>
    );
  };
}
