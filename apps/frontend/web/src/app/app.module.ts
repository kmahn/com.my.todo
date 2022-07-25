import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { JoinPageComponent } from './pages/join-page/join-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { appConfigProvider } from './providers/config.provider';
import { AuthBaseService } from './services/auth-base.service';
import { AuthService } from './services/auth.service';
import { TodoAllComponent } from './pages/todo-pages/todo-all/todo-all.component';
import { TodoMeComponent } from './pages/todo-pages/todo-me/todo-me.component';
import { TodoComponent } from './pages/todo-pages/todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    JoinPageComponent,
    TodoAllComponent,
    TodoMeComponent,
    TodoComponent,
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
