import { Injectable } from "@angular/core";
import { User } from "../model/User";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private user: User;

  constructor(
    private local: NativeStorage,
    private google: GooglePlus,
    private router: Router,
    private AFauth: AngularFireAuth
  ) {}

  public async checkSesion(): Promise<void> {
    //Si es null no está iniciado
    if (!this.user) {
      try {
        this.user = await this.local.getItem("user");
      } catch (err) {
        this.user = null;
      }
    }
  }

  async onLogin(user:User): Promise<firebase.auth.UserCredential>{
    try{
      return await this.AFauth.auth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch(error){
      console.log('Error al iniciar sesión');
    }
  }

  async onRegistrer(user: User): Promise<firebase.auth.UserCredential> {
    try{
      return await this.AFauth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch (error) {
      console.log('Error al crear usuario');
    }
  }

  public isAuthenticated(): boolean {
    return this.user ? true : false;
  }

  /**
   * Almacena el usuario en local con el nombre 'user
   * @param user el usuario a almacenar, en ca
   * saveSession() emilinará el usuario -> se
   * sesión
   */
  public async saveSession(user?: User) {
    if (user) {
      await this.local.setItem("user", user);
    } else {
      await this.local.remove("user");
    }
  }

  public async logout() {
    await this.google.logout();
    this.user = null;
    await this.saveSession();
    this.router.navigate(["login"]);
  }

  public loginGoogle(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      //lógica
      this.google
        .login({})
        .then(d => {
          if (d && d.email) {
            let user: User = {
              email: d.email,
              displayName: d.displayName,
              imageUrl: d.imageUrl,
              userId: d.userId
            };
            this.user = user;
            this.saveSession(user);
            //ya está guardado
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(false));
    });
  }
}
