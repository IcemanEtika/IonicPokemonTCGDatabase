/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Favorite } from './favorite';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  favoriteList = new BehaviorSubject([]);
  private storage: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'favcards.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
          this.storage = db;
          this.storage.executeSql(`CREATE TABLE IF NOT EXISTS cards(id INTEGER PRIMARY KEY AUTOINCREMENT, card_id TEXT, card_name TEXT,
             card_img TEXT, card_rarity TEXT, artist_name TEXT, set_name TEXT, set_num INTEGER)`, []).then(() => {
              this.getFavorites();
              this.isDbReady.next(true);
            });
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchFavorites(): Observable<any> {
    return this.favoriteList.asObservable();
  }

  getFavorites() {
    return this.storage.executeSql('SELECT * FROM cards', []).then(res => {
      const items: Favorite[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            card_id: res.rows.item(i).card_id,
            card_name: res.rows.item(i).card_name,
            card_img: res.rows.item(i).card_img,
            card_rarity: res.rows.item(i).card_rarity,
            artist_name: res.rows.item(i).artist_name,
            set_name: res.rows.item(i).set_name,
            set_num: res.rows.item(i).set_num,
           });
        }
      }
      this.favoriteList.next(items);
    });
  }

  addFavorite(card) {
    const data = [card.id, card.name, card.images.small, card.rarity, card.artist, card.series, card.number];
    return this.storage.executeSql(
      'INSERT INTO cards (card_id, card_name, card_img, card_rarity, artist_name, set_name, set_num) VALUES (?, ?, ?, ?, ?, ?, ?)', data
    );
  }

  checkIfExists(card_id): Promise<Favorite> {
    return this.storage.executeSql('SELECT * FROM cards WHERE card_id = ?', [card_id]).then(res => {
      if (res.rows.length === 0) {
        return undefined;
      }
      const idx = res.rows.length - 1;
      return {
        id: res.rows.item(idx).id,
        card_id: res.rows.item(idx).card_id,
        card_name: res.rows.item(idx).card_name,
        card_img: res.rows.item(idx).card_img,
        card_rarity: res.rows.item(idx).card_rarity,
        artist_name: res.rows.item(idx).artist_name,
        set_name: res.rows.item(idx).set_name,
        set_num: res.rows.item(idx).set_num,
      };
    });
  }

  deleteFavorite(id) {
    return this.storage.executeSql('DELETE FROM cards WHERE card_id = ?', [id])
    .then(_ => {
      this.getFavorites();
    });
  }

  deleteAllFavorites() {
    return this.storage.executeSql('DELETE FROM cards').then(_ => {
      this.getFavorites();
    });
  }
}
