import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { ThemeserviceService } from '../../service/themeservice.service';
import { PrimeIcons } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-common',
  imports: [RouterOutlet],
  templateUrl: './common.component.html',
  styleUrl: './common.component.css'
})
export class CommonComponent implements OnInit {
  themeicons: any;
  isDarkTheme: boolean = false;
  navLogos = [
    { name: 'intro', icon: PrimeIcons.USER },
    { name: 'projects', icon: PrimeIcons.BRIEFCASE },
    { name: 'skills', icon: PrimeIcons.CODE },
    { name: 'contact', icon: PrimeIcons.ENVELOPE },
  ]
  constructor(private themeservice: ThemeserviceService, private router: Router) {
    this.themeservice.themes.subscribe(themes => {
      this.themeicons = themes;
    })
    this.themeservice.themeSubject.subscribe(theme => {
      this.isDarkTheme = theme.name == 'dark' || false;
    })
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
    try {
      this.router.navigate(['/' + item.name]);
    } catch (error) {
      console.error('error while navigating to page', error);
    }
  }
}
