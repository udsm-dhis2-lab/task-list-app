import { Component, NgZone, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Task, TaskService } from "../../shared";
import { ReactWrapperModule } from "@iapps/ng-dhis2-ui";
import React, { useEffect, useState } from "react";
import { CircularLoader, Center, Chip, SelectorBar } from "@dhis2/ui";
import { TaskList, TaskSelectorBar } from "./components";
import { ActivatedRoute, Router } from "@angular/router";

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
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  ngZone = inject(NgZone);

  TaskList = () => {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<Task[]>([]);
    const selectedCategory =
      (this.activatedRoute?.snapshot?.queryParams || {})["category"] || "all";

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
            <SelectorBar>
              <TaskSelectorBar
                selectedCategory={selectedCategory}
                onChange={(selectedCategory: string) => {
                  this.ngZone.run(() =>
                    this.router.navigate([`/current-tasks`], {
                      queryParams: { category: selectedCategory },
                    })
                  );
                }}
              />
            </SelectorBar>
            <div className="task-list-container">
              <TaskList tasks={tasks} />
            </div>
          </>
        )}
      </>
    );
  };
}
