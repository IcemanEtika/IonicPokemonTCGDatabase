import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  url = 'https://api.pokemontcg.io/v2/';
  header = new HttpHeaders({'X-Api-Key':'961ffd89-3b26-43c0-8b5d-67822bf50d9e'});

  constructor(private http: HttpClient) {}
  getSets() {
    const fullUrl = this.url + 'sets';
    return this.http.get(fullUrl, {headers: this.header}).pipe(
      map(data => data['data'])
    );
  }
  getSetCards(setName: string) {
    const fullUrl = this.url + 'cards?q=set.id:' + setName;
    return this.http.get(fullUrl, {headers: this.header}).pipe(
      map(data => data['data'])
    );
  }
  getSingleCard(cardId: string) {
    const fullUrl = this.url + 'cards/' + cardId;
    return this.http.get(fullUrl, {headers: this.header}).pipe(
      map(data => data['data'])
    );
  }
}
