import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private AFauth: AngularFireAuth
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
