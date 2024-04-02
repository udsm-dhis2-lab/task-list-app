import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent, AppComponentContent } from './app.component';
import { AppShellModule } from '@iapps/ng-dhis2-shell';
import { environment } from '../environments/environment';
import {ReactWrapperModule} from '@iapps/ng-dhis2-ui';
import { NgDhis2ShellComponent } from '@iapps/ng-dhis2-shell';
import { NgDhis2UiModule } from '@iapps/ng-dhis2-ui';
import { TaskListComponent } from './task-list/task-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AppComponentContent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    ReactWrapperModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AppShellModule.forRoot({
      pwaEnabled: false,
      isDevMode: !environment.production,
    }),
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
