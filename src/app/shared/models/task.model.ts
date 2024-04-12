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
  href!: string;
  [x: string]: any;

  constructor(dataSet: any) {
    this.id = dataSet.id;
    this.title = this.#getTitle(dataSet);
    this.startDate = this.#getFormatedDate(dataSet.entryStartDate);
    this.dueDate = this.#getFormatedDate(dataSet.entryDueDate);
    this.status = this.#getStatus(dataSet.completed);
    this.href = this.#getHref(dataSet);
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

  #getHref(dataSet: any): string {
    return `../../../dhis-web-aggregate-data-entry/index.html#/?dataSetId=${dataSet.id}&orgUnitId=${dataSet.orgUnit?.id}&periodId=${dataSet.entryPeriod?.id}`;
  }
}
