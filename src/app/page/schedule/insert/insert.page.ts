import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/api/schedule.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  LoadingController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {
  formInsertSchedule: FormGroup;
  _storage: Storage;
  storageIdUser: string;
  constructor(
    private scheduleService: ScheduleService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private navController: NavController,
    private storage: Storage
  ) {
    this.buildForm();
  }
  get name() {
    return this.formInsertSchedule.get('name');
  }
  get startTime() {
    return this.formInsertSchedule.get('startTime');
  }
  get endTime() {
    return this.formInsertSchedule.get('endTime');
  }

  buildForm() {
    this.formInsertSchedule = this.formBuilder.group({
      name: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
    });
  }

  async ngOnInit() {
    this._storage = await this.storage.create();

    this.storageIdUser = await this.storage.get('idUser');
  }
  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
    });

    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });

    await loading.present();
  }

  async register() {
    if (!this.formInsertSchedule.valid) {
      this.name.markAsDirty();
      this.startTime.markAsDirty();
      this.endTime.markAsDirty();
      this.presentToast(
        'Complete y corrija todos los datos del formulario.',
        5000
      );

      return false;
    }

    let formData = new FormData();

    formData.append('name', this.name.value);
    formData.append(
      'startTime',
      this.startTime.value.substring(0, 10) +
        ' ' +
        this.startTime.value.substring(11, 16) +
        ':00'
    );
    formData.append(
      'endTime',
      this.endTime.value.substring(0, 10) +
        ' ' +
        this.endTime.value.substring(11, 16) +
        ':00'
    );
    formData.append('idUser', this.storageIdUser);

    await this.presentLoading();

    this.scheduleService.insert(formData).subscribe((res: any) => {
      this.loadingController.dismiss();

      if (res.mo.type == 'error' || res.mo.type == 'exception') {
        this.presentToast(res.mo.listMessage[0], 5000);

        return false;
      }

      this.presentToast(res.mo.listMessage[0], 2000);
      this.formInsertSchedule.reset();
      // this.navController.navigateRoot(['general/index']);
    });
  }
}
