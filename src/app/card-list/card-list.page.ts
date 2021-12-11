import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CardsService } from '../services/cards.service';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.page.html',
  styleUrls: ['./card-list.page.scss'],
})
export class CardListPage implements OnInit {
  results: Observable<any>;
  searchResults: Observable<any>;
  searchTerm = '';
  constructor(private httpService: CardsService, public alertController: AlertController, private activated_route: ActivatedRoute) { }

  ngOnInit() {
    this.activated_route.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('id')) {
          return;
        }
        else {
          const id = paramMap.get('id');
          this.results = this.httpService.getSetCards(id);
        }
      }
    );
  }
  cardSearch() {
    this.searchResults = this.results.pipe(map(results =>
      results.filter(result => result.name.toLowerCase().startsWith(this.searchTerm.toLowerCase()))));
    this.results = this.searchResults;
  }
  showInfo() {
    this.results.subscribe(async result => {
      const detail = result[0].set;
      const alert = await this.alertController.create({
        header: "Set Information",
        message: "Set name: " + detail.name + "<br>Series: " + detail.series + "<br>Total cards: " + detail.total,
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}
