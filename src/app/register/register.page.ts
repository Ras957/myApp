import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { UiComponent } from '../common/ui/ui.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user:User;

  constructor(
    private auth: AuthService,
    private ui: UiComponent,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

  public async register() {
    const user = await this.auth.onRegistrer(this.user);
    if (user){
      this.ui.presentLoading();
      this.router.navigateByUrl('/');
    }else{
      this.ui.presentToast("Introduzca un email válido y una contraseña con 6 carácteres o más",
      "danger",10000);
    }
  }

  public async loginGoogle() {
    this.auth.loginGoogle();
    const r: boolean = await this.auth.loginGoogle();
    this.ui.hideLoading();
    if (r) {
      this.router.navigate(["/tabs"]);
    }
  }

}
