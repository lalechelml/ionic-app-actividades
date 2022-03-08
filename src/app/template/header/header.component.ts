import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  _storage: Storage;

  storageEmail: string;

  constructor(private storage: Storage, private navController: NavController) {}

  async ngOnInit() {
    this._storage = await this.storage.create();

    this.storageEmail = await this.storage.get('email');
  }

  logOut(): void {
    this._storage.remove('idUser');
    this._storage.remove('email');

    this.navController.navigateRoot(['home']);
  }
}
