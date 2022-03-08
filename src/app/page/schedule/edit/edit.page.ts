import { Component, OnInit, Input } from '@angular/core';
import {
  ModalController,
  NavController,
  ToastController,
  LoadingController,
} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from 'src/app/api/schedule.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  @Input() idSchedule: string;
  @Input() name: string;
  @Input() startTime: string;
  @Input() endTime: string;
  @Input() idUser: string;

  formSchedule: FormGroup;

  get nameFv() {
    return this.formSchedule.get('name');
  }
  get startTimeFv() {
    return this.formSchedule.get('startTime');
  }
  get endTimeFv() {
    return this.formSchedule.get('endTime');
  }

  constructor(
    private scheduleService: ScheduleService,
    public modalController: ModalController,
    private toastController: ToastController,
    private navController: NavController,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController
  ) {
    this.buildForm();
  }

  buildForm() {
    this.formSchedule = this.formBuilder.group({
      name: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.nameFv.setValue(this.name);
    this.startTimeFv.setValue(new Date(this.startTime));
    this.endTimeFv.setValue(new Date(this.endTime));
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
    if (!this.formSchedule.valid) {
      this.nameFv.markAsDirty();
      this.startTimeFv.markAsDirty();
      this.endTimeFv.markAsDirty();
      this.presentToast(
        'Complete y corrija todos los datos del formulario.',
        5000
      );

      return false;
    }

    let formData = new FormData();
    formData.append('idSchedule', this.idSchedule);

    formData.append('name', this.nameFv.value);
    formData.append(
      'startTime',
      this.startTimeFv.value.substring(0, 10) +
        ' ' +
        this.startTimeFv.value.substring(11, 16) +
        ':00'
    );
    formData.append(
      'endTime',
      this.endTimeFv.value.substring(0, 10) +
        ' ' +
        this.endTimeFv.value.substring(11, 16) +
        ':00'
    );
    formData.append('idUser', this.idUser);

    await this.presentLoading();

    this.scheduleService.update(formData).subscribe((res: any) => {
      this.loadingController.dismiss();

      if (res.mo.type == 'error' || res.mo.type == 'exception') {
        this.presentToast(res.mo.listMessage[0], 5000);
        return false;
      }

      this.presentToast(res.mo.listMessage[0], 2000);
      this.formSchedule.reset();
      this.dismiss();

      // this.navController.navigateRoot(['general/index']);
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
