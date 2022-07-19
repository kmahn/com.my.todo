import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { JoinPageComponent } from './pages/join-page/join-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'login', canActivate: [NotAuthGuard], component: LoginPageComponent },
  { path: 'main', canActivate: [AuthGuard],  component: MainPageComponent },
  { path: 'join', canActivate: [NotAuthGuard], component: JoinPageComponent },
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
