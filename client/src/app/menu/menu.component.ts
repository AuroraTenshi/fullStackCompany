import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
