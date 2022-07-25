import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthBaseService } from '../../services/auth-base.service';

@Component({
  selector: 'td-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public authService: AuthBaseService,
    private router: Router
  ) {
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigateByUrl('/login')
    })
  }
}
