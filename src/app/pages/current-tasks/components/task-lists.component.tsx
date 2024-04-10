// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import React, { useMemo, useState } from "react";
import { Task } from "../../../shared";
import {
  DataTable,
  TableHead,
  DataTableRow,
  DataTableColumnHeader,
  TableBody,
  DataTableCell,
  TableFoot,
  Button,
  Chip,
  Tag,
  Input,
} from "@dhis2/ui";
import { TaskStatusCell } from "./task-status-cell.component";
import { TaskProgress } from "./task-progress.component";
import { TaskColumnHeader } from "src/app/pages/current-tasks/components/task-column-header.component";

const taskListColumns = [
  {
    label: "Task",
    name: "title",
  },
  {
    label: "Start date",
    name: "startDate",
  },
  {
    label: "Due date",
    name: "dueDate",
  },
  {
    label: "Status",
    name: "status",
  },
];

export const TaskList = (props: { tasks: Task[] }) => {
  const { tasks } = props;
  const [taskByStatus, setTaskByStatus] = useState("ALL");
  const [taskFilter, setTaskFilter] = useState<
    { name: string; value: string } | undefined
  >(undefined);

  const taskSummary = useMemo(() => {
    const all = tasks.length;
    const completed = tasks.filter(
      (task) => task.status === "COMPLETED"
    )?.length;
    return {
      all,
      todo: tasks.filter((task) => task.status === "TODO")?.length,
      completed,
      progress: all > 0 ? ((completed / all) * 100).toFixed(0) : undefined,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (taskByStatus === "ALL") {
      return taskFilter
        ? tasks.filter((task) =>
            task[taskFilter.name].includes(taskFilter.value)
          )
        : tasks;
    }

    return tasks.filter((task) => {
      const filterCondition = task.status === taskByStatus;

      if (!taskFilter) {
        return filterCondition;
      }

      return (
        filterCondition && task[taskFilter.name].includes(taskFilter.value)
      );
    });
  }, [tasks, taskByStatus, taskFilter]);

  return (
    <DataTable dense>
      <TableHead>
        <DataTableRow>
          <DataTableCell colSpan="5">
            <div className="task-summary-row">
              <div>
                <Chip
                  dense
                  onClick={() => {
                    setTaskByStatus("ALL");
                  }}
                  selected={taskByStatus === "ALL"}
                >
                  <div className="task-chip">
                    <span>{taskSummary.all}</span>
                    <span>All Tasks</span>
                  </div>
                </Chip>
                <Chip
                  dense
                  onClick={() => {
                    setTaskByStatus("TODO");
                  }}
                  selected={taskByStatus === "TODO"}
                >
                  <div className="task-chip">
                    <span>{taskSummary.todo}</span>
                    <span>Todo</span>
                  </div>
                </Chip>
                <Chip
                  dense
                  onClick={() => {
                    setTaskByStatus("COMPLETED");
                  }}
                  selected={taskByStatus === "COMPLETED"}
                >
                  <div className="task-chip">
                    <span>{taskSummary.completed}</span>
                    <span>Completed</span>
                  </div>
                </Chip>
              </div>
              <TaskProgress taskSummary={taskSummary} />
            </div>
          </DataTableCell>
        </DataTableRow>
      </TableHead>
      <TableHead>
        <DataTableRow>
          {taskListColumns.map((taskListColumn) => (
            <TaskColumnHeader
              key={taskListColumn.name}
              label={taskListColumn.label}
              onFilter={(event: any) => {
                setTaskFilter(event);
              }}
              name={taskListColumn.name}
            />
          ))}
          <DataTableColumnHeader></DataTableColumnHeader>
        </DataTableRow>
      </TableHead>
      <TableBody>
        {(filteredTasks || []).map((task) => (
          <DataTableRow key={task.id}>
            {/* <DataTableCell>{task.id}</DataTableCell> */}
            <DataTableCell>{task.title}</DataTableCell>
            <DataTableCell>{task.startDate}</DataTableCell>
            <DataTableCell>{task.dueDate}</DataTableCell>
            <TaskStatusCell status={task.status} />
            <DataTableCell align="right">
              {task.status === "TODO" ? (
                <Button small>
                  <a className="button-link" href={task.href}>
                    Enter data
                  </a>
                </Button>
              ) : (
                <></>
              )}
            </DataTableCell>
          </DataTableRow>
        ))}
      </TableBody>
      <TableFoot>
        <DataTableRow>
          <DataTableCell colSpan="5"></DataTableCell>
        </DataTableRow>
      </TableFoot>
    </DataTable>
  );
};
