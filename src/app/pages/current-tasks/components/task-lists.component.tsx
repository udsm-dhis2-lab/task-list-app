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
} from "@dhis2/ui";
import { TaskStatusCell } from "./task-status-cell.component";

export const TaskList = (props: { tasks: Task[] }) => {
  const { tasks } = props;
  const [currentTaskFilter, setCurrentTaskFilter] = useState("ALL");

  const taskSummary = useMemo(() => {
    return {
      all: tasks.length,
      todo: tasks.filter((task) => task.status === "TODO")?.length,
      completed: tasks.filter((task) => task.status === "COMPLETED")?.length,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (currentTaskFilter === "ALL") {
      return tasks;
    }

    return tasks.filter((task) => task.status === currentTaskFilter);
  }, [tasks, currentTaskFilter]);

  return (
    <DataTable dense>
      <TableHead>
        <DataTableRow>
          <DataTableCell colSpan="5">
            <Chip
              dense
              onClick={() => {
                setCurrentTaskFilter("ALL");
              }}
              selected={currentTaskFilter === "ALL"}
            >
              <div className="task-chip">
                <span>{taskSummary.all}</span>
                <span>All Tasks</span>
              </div>
            </Chip>
            <Chip
              dense
              onClick={() => {
                setCurrentTaskFilter("TODO");
              }}
              selected={currentTaskFilter === "TODO"}
            >
              <div className="task-chip">
                <span>{taskSummary.todo}</span>
                <span>Todo</span>
              </div>
            </Chip>
            <Chip
              dense
              onClick={() => {
                setCurrentTaskFilter("COMPLETED");
              }}
              selected={currentTaskFilter === "COMPLETED"}
            >
              <div className="task-chip">
                <span>{taskSummary.completed}</span>
                <span>Completed</span>
              </div>
            </Chip>
          </DataTableCell>
        </DataTableRow>
      </TableHead>
      <TableHead>
        <DataTableRow>
          {/* <DataTableColumnHeader width="20px">Task ID</DataTableColumnHeader> */}
          <DataTableColumnHeader>Task</DataTableColumnHeader>
          <DataTableColumnHeader>Start date</DataTableColumnHeader>
          <DataTableColumnHeader>Due date</DataTableColumnHeader>
          <DataTableColumnHeader>Status</DataTableColumnHeader>
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
              {/* <Button small>View task</Button> */}
            </DataTableCell>
          </DataTableRow>
        ))}
      </TableBody>
      <TableFoot>
        <DataTableRow>
          <DataTableCell colSpan="5">Footer content</DataTableCell>
        </DataTableRow>
      </TableFoot>
    </DataTable>
  );
};
