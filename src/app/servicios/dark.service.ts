import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DarkService {
  public darkMode: boolean = true;

  constructor() {
    const perfersDark = window.matchMedia('prefers-color-scheme: dark');
    this.darkMode = perfersDark.matches;
  }

  public checkDarkTheme() {
    const perfersDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (perfersDark.matches) {
      document.body.classList.toggle("dark");
    }
  }

  public cambio(){
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }
}
