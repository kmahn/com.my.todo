import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AuthBaseService } from './services/auth-base.service';
import { AuthService } from './services/auth.service';
import { MockAuthService } from './services/mock-auth.service';
import { JoinPageComponent } from './pages/join-page/join-page.component';
import {AutoFocus} from "./directives/auto-focus.directive";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    JoinPageComponent,
    AutoFocus,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: AuthBaseService,
      useClass: environment.production ? AuthService : MockAuthService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
