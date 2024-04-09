// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import React from "react";
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
} from "@dhis2/ui";
import { TaskStatusCell } from "./task-status-cell.component";

export const TaskList = (props: { tasks: Task[] }) => {
  const { tasks } = props;
  return (
    <DataTable dense>
      <TableHead>
        <DataTableRow>
          <DataTableColumnHeader width="20px">Task ID</DataTableColumnHeader>
          <DataTableColumnHeader>Title</DataTableColumnHeader>
          <DataTableColumnHeader>Start date</DataTableColumnHeader>
          <DataTableColumnHeader>Due date</DataTableColumnHeader>
          <DataTableColumnHeader width="20px">Status</DataTableColumnHeader>
          <DataTableColumnHeader></DataTableColumnHeader>
        </DataTableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task) => (
          <DataTableRow key={task.id}>
            <DataTableCell>{task.id}</DataTableCell>
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
          <DataTableCell colSpan="4">Footer content</DataTableCell>
        </DataTableRow>
      </TableFoot>
    </DataTable>
  );
};
