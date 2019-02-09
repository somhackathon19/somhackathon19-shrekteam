import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-component',
  templateUrl: 'main.component.html'
})

export class MainComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log('Hey');
  }
}
