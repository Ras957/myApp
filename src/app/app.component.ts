import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Globalization } from "@ionic-native/globalization/ngx";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "./servicios/auth.service";
import { Router, NavigationEnd } from "@angular/router";
import { DarkService } from "./servicios/dark.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private global: Globalization,
    private translate: TranslateService,
    private auth: AuthService,
    private router: Router,
    private dark: DarkService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      //Ya podemos ejecutar lo que queremos
      this.translate.setDefaultLang("es");
      this.global
        .getPreferredLanguage()
        .then(v => {
          const language = v.value.substring(0, 2);
          if (language === "es") {
            this.translate.use("es");
          } else {
            this.translate.use("en");
          }
        })
        .catch(err => this.translate.use("en"));
      await this.auth.checkSesion();
      //he comprobado si puedes o no ir a login
      if (this.auth.isAuthenticated()) {
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            if (this.router.url === "/" || this.router.url === "/login") {
              this.router.navigate(["/tabs"]);
            }
          }
        });
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public cambioEN() {
    this.translate.use("en");
  }

  public cambioES() {
    this.translate.use("es");
  }

  public segmentChanged(ev: any) {
    if (this.translate.currentLang === "es") {
      this.cambioEN();
    } else {
      this.cambioES();
    }
    console.log(this.translate.currentLang);
  }

  public changeDark(): void {
    this.dark.cambio();
  }
}
