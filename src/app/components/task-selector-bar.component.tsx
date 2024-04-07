// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
import { SelectorBarItem, Menu, MenuItem } from "@dhis2/ui";
import React, { useMemo, useState } from "react";

const taskCategories = [
  {
    id: "current-tasks",
    label: "Current tasks",
  },
  {
    id: "await-approval",
    label: "Awaiting approval",
  },
  {
    id: "need-correction",
    label: "Need correction",
  },
  {
    id: "completed",
    label: "Completed",
  },
];
export const TaskSelectorBar = (props: {
  selectedCategory?: string;
  onChange: Function;
}) => {
  const { selectedCategory, onChange } = props;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(selectedCategory || "current-tasks");

  const selectedLabel = useMemo(() => {
    return taskCategories.find(({ id }) => id === selected)?.label;
  }, [selected]);
  return (
    <SelectorBarItem
      label="Tasks"
      value={selectedLabel}
      open={open}
      setOpen={setOpen}
    >
      <Menu>
        {taskCategories.map(({ id, label }) => (
          <MenuItem
            key={id}
            label={label}
            onClick={() => {
              setOpen(false);
              setSelected(id);
              onChange(id);
            }}
          />
        ))}
      </Menu>
    </SelectorBarItem>
  );
};
