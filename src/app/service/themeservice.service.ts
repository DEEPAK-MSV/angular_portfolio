import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrimeIcons } from 'primeng/api';
import { OverlayContainer } from '@angular/cdk/overlay';
import { isPlatformBrowser } from '@angular/common';

export interface Theme {
  name: string;
  display: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeserviceService {

  public themes = new BehaviorSubject([
    { name: 'dark', display: 'DARK', icon: PrimeIcons.MOON },
    { name: 'light', display: 'LIGHT', icon: PrimeIcons.SUN },
  ]);

  public themeSubject = new BehaviorSubject<Theme>(this.themes.value[1]);

  constructor(private overlay: OverlayContainer, @Inject(PLATFORM_ID) private platformId: Object) {
  }


  settheme = (themeitem: any) => {
    const savedtheme = isPlatformBrowser(this.platformId) ? localStorage.getItem('selectedTheme') : null;
    const theme = themeitem ? themeitem : savedtheme ? JSON.parse(savedtheme) : this.themes.value[1];
    this.overlaytheme(theme.name);
    this.themeSubject.next(theme);
    isPlatformBrowser(this.platformId) ? localStorage.setItem('selectedTheme', JSON.stringify(theme)) : null;
  }


  overlaytheme = (newTheme: string, oldTheme?: string) => {
    if (this.themeSubject.value.name != newTheme) {
      this.overlay.getContainerElement().classList.remove(this.themeSubject.value.name);
    }
    this.overlay.getContainerElement().classList.add(newTheme);
  }
}
