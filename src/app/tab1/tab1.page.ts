import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../servicios/auth.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { UiComponent } from "../common/ui/ui.component";
import { NewPage } from "../modals/new/new.page";
import { ModalController } from '@ionic/angular';

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  constructor(
    private translate: TranslateService,
    private auth: AuthService,
    private geolocation: Geolocation,
    private ui: UiComponent,
    private modal:ModalController
  ) {}

  async presentModal() {
    const modal = await this.modal.create({
      component: NewPage,
      cssClass: "modal-fullscreen"
    });
    await modal.present();
  }

  public doRefresh(event: Event) {}
}
