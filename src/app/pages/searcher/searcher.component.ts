import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearcherService } from './searcher.service';
import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styles: [],
  providers: [
    SearcherService
  ]
})
export class SearcherComponent implements OnInit {
  users: User[] = [];
  hospitals: Hospital[] = [];
  doctors: Doctor[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _searcherSercice: SearcherService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      const key = params.key;
      this.search(key);
    });
}

  ngOnInit() {
  }

  search(key: string) {
    this._searcherSercice.search(key).subscribe((result: any) => {
      console.log('Resultado de la busqueda... ' , result);

      // Setamos los resultados
      this.users = result.users;
      this.hospitals = result.hospitals;
      this.doctors = result.doctors;
    });
  }
}
