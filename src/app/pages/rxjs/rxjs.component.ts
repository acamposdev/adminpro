import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscribable } from 'rxjs/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber } from '../../../../node_modules/rxjs/Subscriber';
import { Subscription } from '../../../../node_modules/rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.returnObservable().pipe(
      retry(2)
    ).subscribe(
      (result) => { console.log('result ' , result); },
      (err) => { console.error('ERROR ' , err); },
      () => { console.log('El observador terminó'); }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let counter = 0;
      const interval = setInterval( () => {

        counter++;

        const salida = {
          valor: counter
        };

        observer.next(salida);

        // if (counter === 3) {
        //   console.log('clear interval');
        //   clearInterval(interval);
        //   observer.complete();
        // }

        // if (counter === 2) {
        //  clearInterval(interval);
        //  observer.error('HE petao!!');
        // }
      }, 1000);

    }).pipe(

      map( resp => {
        return resp.valor;
      }),
      filter( ( resp, index ) => {
        if (resp % 2 === 1) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
