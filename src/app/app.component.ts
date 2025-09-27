import { Component } from '@angular/core';
import { CommonComponent } from './Components/common/common.component';
import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ThemeserviceService } from './service/themeservice.service';

@Component({
  selector: 'app-root',
  imports: [CommonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Deepak Portfolio';
  constructor(private themeService: ThemeserviceService, private titleservice: Title) {
    this.themeService.settheme();
    this.titleservice.setTitle(this.title);
  }
  ngOnInit(): void {

  }
}
