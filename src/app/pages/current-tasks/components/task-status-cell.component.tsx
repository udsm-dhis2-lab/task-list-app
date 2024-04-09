// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import React, { useMemo } from "react";
import { Task } from "../../../shared";
import { DataTableCell } from "@dhis2/ui";

export const TaskStatusCell = (task: Partial<Task>) => {
  const { status } = task;

  const statusBackgroundColor = useMemo(() => {
    switch (status) {
      case "COMPLETED":
        return "lightgreen";

      case "TODO":
      default:
        return "#eff";
    }
  }, [status]);

  return (
    <DataTableCell backgroundColor={statusBackgroundColor}>
      {task.status}
    </DataTableCell>
  );
};
