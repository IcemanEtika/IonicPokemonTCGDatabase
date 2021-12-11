import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CardsService } from '../services/cards.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  results: Observable<any>;
  searchResults: Observable<any>;
  searchTerm = '';
  constructor(private httpService: CardsService) {}

  ngOnInit() {
    this.results = this.httpService.getSets();
  }
  setSearch() {
    this.searchResults = this.results.pipe(map(results =>
      results.filter(result => result.name.toLowerCase().startsWith(this.searchTerm.toLowerCase()))));
    this.results = this.searchResults;
  }
}
