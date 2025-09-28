import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { ThemeserviceService } from '../../service/themeservice.service';
import { PrimeIcons } from 'primeng/api';
import { Router } from '@angular/router';
import { filter, timer } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-common',
  imports: [RouterOutlet, MatMenuModule, ToggleSwitch, FormsModule],
  templateUrl: './common.component.html',
  styleUrl: './common.component.css'
})
export class CommonComponent implements OnInit {
  themeicons: any;
  isDarkTheme: boolean = false;
  currentnav: string = '';
  selectedtheme: any;
  autodarkthemevalue: boolean = false;
  showthemeoption: boolean = false;
  checkautovalue: any;
  navLogos = [
    { name: 'intro', icon: PrimeIcons.USER, navurl: '/intro' },
    { name: 'browse', icon: PrimeIcons.SEARCH, navurl: '/browse' },
    { name: 'career', icon: PrimeIcons.BRIEFCASE, navurl: '/career' },
    { name: 'skills', icon: PrimeIcons.CODE, navurl: '/skills' },
    { name: 'contact', icon: PrimeIcons.ENVELOPE, navurl: '/contact' },
  ]
  constructor(private themeservice: ThemeserviceService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.themeservice.themes.subscribe(themes => {
      this.themeicons = themes;
    })
    this.themeservice.themeSubject.subscribe(theme => {
      this.isDarkTheme = theme.name == 'dark' || false;
      this.selectedtheme = theme.name;
    })
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentnav = event.url;
      });
  }

  ngOnInit() {
    this.showthemeoption = isPlatformBrowser(this.platformId) ? true : false;
    this.checkautotheme()
  }

  changetheme(item: any) {
    try {
      this.autodarkthemevalue ? this.autothemeturn() : null;
      this.themeservice.settheme(item);
    } catch (error) {
      console.error('error while changing theme', error);
    }
  }

  autothemeturn() {
    this.autodarkthemevalue = !this.autodarkthemevalue;
    if (isPlatformBrowser(this.platformId)) {
      if (this.autodarkthemevalue) {
        localStorage.setItem('autodarktheme', JSON.stringify(this.autodarkthemevalue));
        this.checkautotheme();
      } else {
        this.checkautovalue ? this.checkautovalue.unsubscribe() : null;
        localStorage.removeItem('autodarktheme')
      }
    }
  }

  checkautotheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.autodarkthemevalue = localStorage.getItem('autodarktheme') ? true : false;
      this.checkautovalue = timer(0, 1000).subscribe(() => {
        if (this.autodarkthemevalue) {
          const hour = new Date().getHours();
          if (hour >= 18 || hour <= 6) {
            this.themeservice.settheme(this.themeicons[0]);
          } else {
            this.themeservice.settheme(this.themeicons[1]);
          }
        }
      })
    }
  }

  navigatetopage(item: any) {
    try {
      this.router.navigate([item.navurl]);
    } catch (error) {
      console.error('error while navigating to page', error);
    }
  }
}
