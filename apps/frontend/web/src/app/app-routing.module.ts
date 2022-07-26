import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { JoinPageComponent } from './pages/join-page/join-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { TodoAllComponent } from './pages/todo-pages/todo-all/todo-all.component';
import { TodoMeComponent } from './pages/todo-pages/todo-me/todo-me.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'login', canActivate: [NotAuthGuard], component: LoginPageComponent },
  { path: 'main', canActivate: [AuthGuard], component: MainPageComponent },
  { path: 'join', canActivate: [NotAuthGuard], component: JoinPageComponent },
  { path: 'todos', canActivate: [AuthGuard], component: TodoAllComponent },
  { path: 'todos/me', canActivate: [AuthGuard], component: TodoMeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
