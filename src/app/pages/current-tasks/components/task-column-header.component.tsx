// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { DataTableColumnHeader, Input } from "@dhis2/ui";
import React, { useState } from "react";
export const TaskColumnHeader = (props: {
  label: string;
  name: string;
  onFilter: Function;
}) => {
  const { label, name, onFilter } = props;
  const [showFilter, setShowFilter] = useState(false);
  return (
    <DataTableColumnHeader
      filter={
        <Input
          dense
          name={name}
          onChange={(event: any) => {
            onFilter(event);
          }}
        />
      }
      name="task"
      showFilter={showFilter}
      onFilterIconClick={(event: any) => {
        setShowFilter(event.show);
      }}
    >
      {label}
    </DataTableColumnHeader>
  );
};
