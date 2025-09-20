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
  navLogos = [
    { name: 'intro', icon: PrimeIcons.USER, navurl: '/intro' },
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
    console.log('themechangeclicked');
    try {
      debugger;
      console.log(item);
      this.themeservice.settheme(item);
    } catch (error) {
      console.error('error while changing theme', error);
    }
  }

  navigatetopage(item: any) {
    console.log('navigatetopage clicked', item);
    try {
      this.router.navigate(['/' + item.name]);
    } catch (error) {
      console.error('error while navigating to page', error);
    }
  }
}
