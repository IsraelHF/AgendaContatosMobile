import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  simpleLoader() {
    this.loadingController
      .create({
        message: 'Aguarde...',
      })
      .then((res) => {
        res.present();
      });
  }

  dismissLoader() {
    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    });
  }
}
