import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.countThree().then((message) => {
      console.log('terminó ' , message);
    }).catch((err) => {
      console.error('ERROR en la promesa');
    });

  }

  ngOnInit() {
  }

  countThree(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let counter = 0;

      const interval = setInterval(() => {
        counter++;

        if (counter === 3) {
          resolve(true);
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
