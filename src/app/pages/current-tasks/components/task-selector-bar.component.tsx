// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
import { SelectorBarItem, Menu, MenuItem } from "@dhis2/ui";
import React, { useMemo, useState } from "react";

const taskCategories = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "data-entry",
    label: "Data Entry",
  },
  {
    id: "approval",
    label: "Approval",
  },
];
export const TaskSelectorBar = (props: {
  selectedCategory?: string;
  onChange: Function;
}) => {
  const { selectedCategory, onChange } = props;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(selectedCategory || "all");

  const selectedLabel = useMemo(() => {
    return taskCategories.find(({ id }) => id === selected)?.label;
  }, [selected]);
  return (
    <SelectorBarItem
      label="Category"
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
