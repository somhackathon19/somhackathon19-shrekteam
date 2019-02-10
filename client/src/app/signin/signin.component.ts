import {Component, OnInit} from '@angular/core';
import {ConnecterService} from '../connecter.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private connecterService: ConnecterService,
              private router: Router) {
  }

  step = 1;

  email: string;
  password: string;
  nom: string;
  cognoms: string;
  data: string;
  dona: boolean;
  dni: string;


  ngOnInit() {
  }

  previousStep() {
    if (this.step === 1) {
      this.router.navigate((['login']));
    } else {
      this.step--;
    }
  }

  nextStep() {
    if (this.step === 3) {
      this.signin();
    } else {
      this.step++;
    }
  }

  signin() {
    this.connecterService.signin(this.email, this.password, this.nom, this.cognoms, this.dni);
    this.router.navigate(['/login']);
  }

}
