import { ComponentPortal } from "@angular/cdk/portal";
import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  DataTable,
  DataTableCell,
  DataTableColumnHeader,
  DataTableRow,
  TableBody,
  TableHead,
  TabBar,
  Tab,
  SelectorBar,
  SelectorBarItem,
} from "@dhis2/ui";
import { NgDhis2ShellWrapper } from "@iapps/ng-dhis2-shell";
import React from "react";
import { TaskSelectorBar } from "./components";

@Component({
  selector: "app-root",
  template: '<ng-dhis2-shell (shellHasLoaded)="onReady()"></ng-dhis2-shell>',
})
export class AppComponent extends NgDhis2ShellWrapper {
  override componentPortal: ComponentPortal<any> = new ComponentPortal(
    AppComponentContent
  );
}
@Component({
  selector: "app-root-content",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponentContent {
  activateRoute = inject(ActivatedRoute);
  router = inject(Router);
  Menus = () => (
    <SelectorBar>
      <TaskSelectorBar
        onChange={(selectedCategory: string) => {
          this.router.navigate([`/${selectedCategory}`]);
        }}
      />
      {/* <SelectorBarItem label="Organisation unit"></SelectorBarItem> */}
    </SelectorBar>
  );
  TableData = () => {
    return (
      <DataTable scrollHeight="350px">
        <TableHead>
          <DataTableRow>
            <DataTableColumnHeader fixed top="0">
              First name
            </DataTableColumnHeader>
            <DataTableColumnHeader fixed top="0">
              Last name
            </DataTableColumnHeader>
            <DataTableColumnHeader fixed top="0">
              Incident date
            </DataTableColumnHeader>
            <DataTableColumnHeader fixed top="0">
              Last updated
            </DataTableColumnHeader>
          </DataTableRow>
        </TableHead>
        <TableBody>
          <DataTableRow>
            <DataTableCell>Onyekachukwu</DataTableCell>
            <DataTableCell>Kariuki</DataTableCell>
            <DataTableCell>02/06/2007</DataTableCell>
            <DataTableCell>05/25/1972</DataTableCell>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell>Kwasi</DataTableCell>
            <DataTableCell>Okafor</DataTableCell>
            <DataTableCell>08/11/2010</DataTableCell>
            <DataTableCell>02/26/1991</DataTableCell>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell>Siyabonga</DataTableCell>
            <DataTableCell>Abiodun</DataTableCell>
            <DataTableCell>07/21/1981</DataTableCell>
            <DataTableCell>02/06/2007</DataTableCell>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell>Siyabonga</DataTableCell>
            <DataTableCell>Abiodun</DataTableCell>
            <DataTableCell>07/21/1981</DataTableCell>
            <DataTableCell>02/06/2007</DataTableCell>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell>Siyabonga</DataTableCell>
            <DataTableCell>Abiodun</DataTableCell>
            <DataTableCell>07/21/1981</DataTableCell>
            <DataTableCell>02/06/2007</DataTableCell>
          </DataTableRow>
        </TableBody>
      </DataTable>
    );
  };
}
