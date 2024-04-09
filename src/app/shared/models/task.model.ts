// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { format, formatDistanceToNow } from 'date-fns';
import { TaskStatusType } from './task-status.model';

export class Task {
  id!: string;
  title!: string;
  description!: string;
  startDate!: string;
  dueDate!: string;
  status!: TaskStatusType;

  constructor(dataSet: any) {
    this.id = dataSet.id;
    this.title = this.#getTitle(dataSet);
    this.startDate = this.#getFormatedDate(dataSet.entryStartDate);
    this.dueDate = this.#getFormatedDate(dataSet.entryDueDate);
    this.status = this.#getStatus(dataSet.completed);
  }

  #getTitle(dataSet: any) {
    return `Data entry: ${dataSet.name} for ${dataSet.entryPeriod?.name} - ${dataSet.orgUnit?.name}`;
  }

  #getFormatedDate(date: Date): string {
    if (!date) {
      return '-';
    }

    return format(date, 'dd/MM/yyyy');
  }

  #getStatus(completed: boolean): TaskStatusType {
    if (completed) {
      return 'COMPLETED';
    }

    return 'TODO';
  }
}
