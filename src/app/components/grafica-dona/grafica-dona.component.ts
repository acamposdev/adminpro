import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: []
})
export class GraficaDonaComponent implements OnInit {

  @Input() data: Array<number>;
  @Input() labels: Array<string>;
  @Input() type: string;

  constructor() { }

  ngOnInit() {
    console.log('this.data ' , this.data);
    console.log('this.labels ' , this.labels);
    console.log('this.type ' , this.type);
  }

}
