import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TodoModule } from './features/todo/todo.module';
import { TokenInterceptor } from './interceptors/token.interceptor.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { appConfigProvider } from './providers/config.provider';
import { AuthBaseService } from './services/auth-base.service';
import { AuthService } from './services/auth.service';

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
    TodoModule,
  ],
  providers: [
    {
      provide: AuthBaseService,
      useClass: AuthService,
    },
    {
      provide: COMPOSITION_BUFFER_MODE,
      useValue: false
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    appConfigProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
