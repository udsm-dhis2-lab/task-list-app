import { ComponentPortal } from "@angular/cdk/portal";
import { Component } from "@angular/core";
import { NgDhis2ShellWrapper } from "@iapps/ng-dhis2-shell";
import {
  Button,
  DataTable,
  TableHead,
  DataTableRow,
  DataTableColumnHeader,
  TableBody,
  DataTableCell,
  TableFoot,
} from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import { HttpClient } from '@angular/common/http';
import { Period } from "@iapps/period-utilities";
import TaskListService from "./task-list.service";
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  
  TableData = () => {
    const [data, setData] = useState<any[]>([]); 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const taskListService = new TaskListService();
          const responseData = await taskListService.fetchData();
          const period = new Period();
          const periodList = period.setType('Monthly').get().list();
          console.log(periodList);
          setData(responseData.dataSets);
          console.log("data test inner------------------>", responseData.dataSets);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData();
    }, []);
    return (
      <DataTable scrollHeight="350px">
        <TableHead>
          <DataTableRow>
          <DataTableColumnHeader fixed top="0">Sno/#</DataTableColumnHeader>
            <DataTableColumnHeader fixed top="0">Task</DataTableColumnHeader>
          </DataTableRow>
        </TableHead>
        <TableBody>
        {data.map((task: any, index: number) => (
                        task.organisationUnits.map((orgUnit: any, orgIndex: number) => (

                            <DataTableRow key={`${index}-${orgIndex}`}>
                              <DataTableCell>{orgIndex}</DataTableCell>
                            <DataTableCell>{task.name}-{orgUnit.name}</DataTableCell>
                          </DataTableRow>
                        ))
                    ))}
          
        </TableBody>
      </DataTable>
    );


  };







  
}
