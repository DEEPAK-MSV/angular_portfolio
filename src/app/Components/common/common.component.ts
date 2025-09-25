import { Component } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { ThemeserviceService } from '../../service/themeservice.service';
import { PrimeIcons } from 'primeng/api';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-common',
  imports: [RouterOutlet],
  templateUrl: './common.component.html',
  styleUrl: './common.component.css'
})
export class CommonComponent implements OnInit {
  themeicons: any;
  isDarkTheme: boolean = false;
  currentnav: string = '';
  selectedtheme: any;
  navLogos = [
    { name: 'intro', icon: PrimeIcons.USER, navurl: '/intro' },
    { name: 'browse', icon: PrimeIcons.SEARCH, navurl: '/browse' },
    { name: 'projects', icon: PrimeIcons.BRIEFCASE, navurl: '/projects' },
    { name: 'skills', icon: PrimeIcons.CODE, navurl: '/skills' },
    { name: 'contact', icon: PrimeIcons.ENVELOPE, navurl: '/contact' },
  ]
  constructor(private themeservice: ThemeserviceService, private router: Router) {
    this.themeservice.themes.subscribe(themes => {
      this.themeicons = themes;
    })
    this.themeservice.themeSubject.subscribe(theme => {
      this.isDarkTheme = theme.name == 'dark' || false;
      this.selectedtheme = theme;
      console.log('selected theme', this.selectedtheme);
    })
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentnav = event.url;
      });
  }

  ngOnInit() {

  }

  changetheme(item: any) {
    try {
      this.themeservice.settheme(item);
    } catch (error) {
      console.error('error while changing theme', error);
    }
  }

  navigatetopage(item: any) {
    try {
      this.router.navigate(['/' + item.name]);
    } catch (error) {
      console.error('error while navigating to page', error);
    }
  }
}
