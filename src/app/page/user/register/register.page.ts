import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  LoadingController,
  ToastController,
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formInsertUser: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private navController: NavController
  ) {
    this.buildForm();
  }
  get email() {
    return this.formInsertUser.get('email');
  }
  get password() {
    return this.formInsertUser.get('password');
  }
  get password_confirmation() {
    return this.formInsertUser.get('password_confirmation');
  }

  buildForm() {
    this.formInsertUser = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]],
    });
  }

  ngOnInit() {}

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

  async registerUser() {
    if (!this.formInsertUser.valid) {
      this.email.markAsDirty();
      this.password.markAsDirty();
      this.password_confirmation.markAsDirty();

      this.presentToast(
        'Complete y corrija todos los datos del formulario.',
        5000
      );

      return false;
    }

    let formData = new FormData();

    formData.append('email', this.email.value);
    formData.append('password', this.password.value);
    formData.append('password_confirmation', this.password_confirmation.value);

    await this.presentLoading();

    this.userService.insert(formData).subscribe((res: any) => {
      this.loadingController.dismiss();

      if (res.mo.type == 'error') {
        this.presentToast(res.mo.listMessage[0], 5000);

        return false;
      }

      this.presentToast(res.mo.listMessage[0], 2000);
      this.formInsertUser.reset();
      this.navController.navigateRoot(['home']);
    });
  }
}
