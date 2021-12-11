import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.page.html',
  styleUrls: ['./favorite-list.page.scss'],
})
export class FavoriteListPage implements OnInit {
  results: any[] = [];
  searchResults: any[] = [];
  original: any[] = [];
  searchTerm = '';
  constructor(private db: DbService, public alertController: AlertController) { }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.getFavorites();
        this.db.fetchFavorites().subscribe(item => {
          this.results = item;
          this.original = item;
        });
      }
    });
  }
  cardSearch() {
    this.searchResults = this.original.filter(result => result.card_name.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
    this.results = this.searchResults;
  }
  async deleteAll() {
    this.db.deleteAllFavorites();
    this.results = [];
    this.original = [];
    const alert = await this.alertController.create({
      header: "Success",
      message: "All favorites cleared!",
      buttons: ['OK']
    });
    await alert.present();
  }

}
