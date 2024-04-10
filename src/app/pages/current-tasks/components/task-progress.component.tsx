// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { Tag } from "@dhis2/ui";
import React, { useMemo } from "react";
export const TaskProgress = (props: { taskSummary: any }) => {
  const { taskSummary } = props;

  if (!taskSummary?.progress) {
    return <></>;
  }

  const { progress } = taskSummary;

  const progressStatus = useMemo(() => {
    if (progress >= 33 && progress < 70) {
      return "NORMAL";
    }

    if (progress >= 70) {
      return "GOOD";
    }

    return "POOR";
  }, [progress]);
  return (
    <Tag
      positive={progressStatus === "GOOD"}
      negative={progressStatus === "POOR"}
    >
      <div className="task-chip">
        <span>{progress}%</span>
        <span>Progress</span>
      </div>
    </Tag>
  );
};
