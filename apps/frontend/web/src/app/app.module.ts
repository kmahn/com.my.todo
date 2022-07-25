import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { appConfigProvider } from './providers/config.provider';
import { AuthBaseService } from './services/auth-base.service';
import { AuthService } from './services/auth.service';
import { MockAuthService } from './services/mock-auth.service';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    SignupPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: AuthBaseService,
      useClass: AuthService,
    },
    appConfigProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
