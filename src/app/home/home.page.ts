import { Component } from '@angular/core';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  _storage: Storage;

  txtEmail: string;
  passPassword: string;

  constructor(
    private storage: Storage,
    private navController: NavController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this._storage = await this.storage.create();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });

    await loading.present();
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
    });

    toast.present();
  }

  async logIn() {
    let formData = new FormData();

    formData.append('email', this.txtEmail);
    formData.append('password', this.passPassword);

    await this.presentLoading();

    this.userService.logIn(formData).subscribe((response: any) => {
      this.loadingController.dismiss();

      if (response.mo.type == 'error') {
        this.presentToast(response.mo.listMessage[0], 5000);

        return false;
      }

      this._storage.set('idUser', response.dto.tUser.idUser);
      this._storage.set('email', response.dto.tUser.email);

      this.navController.navigateRoot(['general/index']);
    });
  }
}
