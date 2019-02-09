import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Meetaro';

  constructor(private router: Router) {
  }

  logIn() {
    this.router.navigate([`/main`]);
  }
}
