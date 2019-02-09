import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-component',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent {

  title = 'Meetaro';

  constructor(private router: Router) {
  }

  logIn() {
    this.router.navigate(['/main']);
  }
}
