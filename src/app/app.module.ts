import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent, AppComponentContent } from './app.component';
import { AppShellModule } from '@iapps/ng-dhis2-shell';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AppShellModule.forRoot({
      pwaEnabled: false,
      isDevMode: !environment.production,
    }),
  ],
  declarations: [AppComponent, AppComponentContent],
  bootstrap: [AppComponent],
})
export class AppModule {}
