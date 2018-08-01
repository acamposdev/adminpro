import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '../../../../node_modules/@angular/router';
import { filter, map } from '../../../../node_modules/rxjs/operators';
import { Title, Meta, MetaDefinition } from '../../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  public titulo: string;

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.getDataRoute().subscribe( data => {
      console.log(data);
      this.titulo = data.title;
      this.title.setTitle(this.titulo);

      // Definicion de meta tag
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };

      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(

      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data )

    );
  }
}
