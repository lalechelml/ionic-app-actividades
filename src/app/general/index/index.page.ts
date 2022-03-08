import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  constructor(private navController: NavController) {}

  ngOnInit() {}

  navInsert() {
    this.navController.navigateRoot(['schedule/insert']);
  }

  navList() {
    this.navController.navigateRoot(['schedule/list']);
  }
}
