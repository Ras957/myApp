import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { UiComponent } from '../common/ui/ui.component';

declare var google;


@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit{

  constructor(
    private translate: TranslateService,
    private geolocation: Geolocation,
    private ui:UiComponent
  ) {}

  ngOnInit() {
    this.initMap();
  }

  public async initMap() {
    const rta = await this.geolocation.getCurrentPosition();
    const myLatLng = {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
    console.log(myLatLng);
    const mapEle: HTMLElement = document.getElementById('map');
    const map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event
    .addListenerOnce(map, 'idle', () => { 
      //this.ui.presentLoading();
    })
  }
}
