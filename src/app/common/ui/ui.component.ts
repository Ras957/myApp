import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss'],
})
export class UiComponent implements OnInit {

  public loading: HTMLIonLoadingElement;
  public toast:HTMLIonToastElement;

  constructor(private loadingController: LoadingController,
    public toastController:ToastController) { }

  ngOnInit() { }

  public async presentLoading() {
    await this.hideLoading();

    this.loading = await this.loadingController.create({

    });
    await this.loading.present();
  }

  public async hideLoading(){
    if (this.loading) {
      await this.loading.dismiss();
    }
    this.loading=null;
  }

  async presentToast(msg:string, col:string, dur:number=2000):Promise<void> {
    this.toast = await this.toastController.create({
      message: msg,
      duration: dur,
      color: col,
      showCloseButton: true
    });
    this.toast.present();
  }

}
