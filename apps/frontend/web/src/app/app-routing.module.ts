import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {SignupPageComponent} from "./pages/signup-page/signup-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'login', canActivate: [NotAuthGuard], component: LoginPageComponent },
  { path: 'signup', canActivate: [NotAuthGuard], component: SignupPageComponent},
  { path: 'main', canActivate: [AuthGuard],  component: MainPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {}
