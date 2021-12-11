import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from './../services/db.service';
import { CardsService } from '../services/cards.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.page.html',
  styleUrls: ['./card-view.page.scss'],
})
export class CardViewPage implements OnInit {
  id = '';
  card = {};
  isDisabled = false;
  constructor(private httpService: CardsService, private db: DbService,
    public alertController: AlertController, private activated_route: ActivatedRoute, ) { }

  ngOnInit() {
    this.activated_route.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('id')) {
          return;
        }
        else {
          this.id = paramMap.get('id');
          this.httpService.getSingleCard(this.id).subscribe(res => {
            this.card = res;
            this.db.checkIfExists(this.id).then(x => {
              if (x === undefined) {
                this.isDisabled = !this.isDisabled;
              }
            });
         });
        }
      }
    );
  }
  async saveCard() {
    this.db.addFavorite(this.card).then(res => console.log(res));
    const alert = await this.alertController.create({
      header: "Success",
      message: "Card successfully added to favorites.",
      buttons: ['OK']
    });
    await alert.present();
    this.isDisabled = !this.isDisabled;
  }
  async deleteCard() {
    this.db.deleteFavorite(this.id).then(res => console.log(res));
    const alert = await this.alertController.create({
      header: "Success",
      message: "Card successfully deleted from favorites.",
      buttons: ['OK']
    });
    await alert.present();
    this.isDisabled = !this.isDisabled;
  }



}
