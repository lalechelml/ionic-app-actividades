import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { ScheduleService } from 'src/app/api/schedule.service';
import { Storage } from '@ionic/storage-angular';
import { EditPage } from '../edit/edit.page';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  _storage: Storage;
  storageIdUser: string;
  index: any;
  data: any[];

  constructor(
    private scheduleService: ScheduleService,
    public modalController: ModalController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    this._storage = await this.storage.create();

    this.storageIdUser = await this.storage.get('idUser');
    this.index = 1;
    const formData = new FormData();

    formData.append('idUser', this.storageIdUser);
    formData.append('initiation', this.index);

    this.scheduleService.list(formData).subscribe((res: any) => {
      let arrayAux = res.dto.tPerson;
      arrayAux.map((item) => {
        // item.startTime

        if (new Date(item.startTime) > new Date()) {
          item.state = 'Pendiente';
        }
        if (new Date(item.endTime) < new Date()) {
          item.state = 'Finalizado';
        }

        if (
          new Date(item.endTime) > new Date() &&
          new Date(item.startTime) < new Date()
        ) {
          item.state = 'En Proceso';
        }
      });
      this.data = arrayAux;
    });
  }

  loadData(event) {
    setTimeout(() => {
      this.index += 1;
      const formData = new FormData();

      formData.append('idUser', this.storageIdUser);
      formData.append('initiation', this.index);

      this.scheduleService.list(formData).subscribe((res: any) => {
        if (res.type === 'error') {
          event.target.complete();
          this.infiniteScroll.disabled = true;
          return;
        }
        let arrayAux = res.dto.tPerson;
        arrayAux.map((item) => {
          // item.startTime

          if (new Date(item.startTime) > new Date()) {
            item.state = 'Pendiente';
          }
          if (new Date(item.endTime) < new Date()) {
            item.state = 'Finalizado';
          }

          if (
            new Date(item.endTime) > new Date() &&
            new Date(item.startTime) < new Date()
          ) {
            item.state = 'En Proceso';
          }
        });
        this.data.push(...arrayAux);
        event.target.complete();
      });
    }, 500);
  }

  updateList() {
    this.index = 1;
    const formData = new FormData();
    formData.append('idUser', this.storageIdUser);
    formData.append('initiation', this.index);

    this.scheduleService.list(formData).subscribe((res: any) => {
      let arrayAux = res.dto.tPerson;
      arrayAux.map((item) => {
        if (new Date(item.startTime) > new Date()) {
          item.state = 'Pendiente';
        }
        if (new Date(item.endTime) < new Date()) {
          item.state = 'Finalizado';
        }

        if (
          new Date(item.endTime) > new Date() &&
          new Date(item.startTime) < new Date()
        ) {
          item.state = 'En Proceso';
        }
      });
      this.data = arrayAux;
      this.infiniteScroll.disabled = false;
    });
  }

  async updateUserModal(
    idScheduleProps: string,
    nameProps: string,
    startTimeProps: string,
    endTimeProps: string,
    idUserProps: string
  ) {
    const modal = await this.modalController.create({
      component: EditPage,
      cssClass: 'my-custom-class',
      componentProps: {
        idSchedule: idScheduleProps,
        name: nameProps,
        startTime: startTimeProps,
        endTime: endTimeProps,
        idUser: idUserProps,
      },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    this.updateList();
  }
}
