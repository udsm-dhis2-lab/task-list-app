import { ComponentPortal } from "@angular/cdk/portal";
import { Component, NgZone, inject } from "@angular/core";
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
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  ngZone = inject(NgZone);
  Menus = () => {
    const selectedCategory =
      this.activatedRoute?.snapshot?.firstChild?.routeConfig?.path;
    return (
      <SelectorBar>
        <TaskSelectorBar
          selectedCategory={selectedCategory}
          onChange={(selectedCategory: string) => {
            this.ngZone.run(() =>
              this.router.navigate([`/${selectedCategory}`])
            );
          }}
        />
      </SelectorBar>
    );
  };
}
