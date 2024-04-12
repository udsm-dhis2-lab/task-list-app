import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppShellModule } from '@iapps/ng-dhis2-shell';
import { ReactWrapperModule } from '@iapps/ng-dhis2-ui';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import { environment } from '../environments/environment';
import { AppComponent, AppComponentContent } from './app.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [AppComponent, AppComponentContent],
  imports: [
    BrowserModule,
    ReactWrapperModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AppShellModule.forRoot({
      pwaEnabled: false,
      isDevMode: !environment.production,
    }),
    NgxDhis2HttpClientModule.forRoot({
      namespace: 'task-list',
      version: 1,
      models: [],
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
