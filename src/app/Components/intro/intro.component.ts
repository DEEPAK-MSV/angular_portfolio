import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'app-intro',
  imports: [],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent implements OnInit {
  icons: any = PrimeIcons
  expstartdate = new Date('2022-08-14');
  totalexperience = ((new Date().getTime() - this.expstartdate.getTime()) / (1000 * 3600 * 24 * 30 * 12)).toFixed(0);
  nametext: string = 'Deepak';
  displayText: string = '';
  ngOnInit(): void {
    let index = 0;
    const nametimer = timer(0, 350).subscribe(() => {
      if (index < this.nametext.length) {
        this.displayText += this.nametext.charAt(index);
        index++;
      } else {
        nametimer.unsubscribe(); // stop when finished
      }
    })
  }

  downloadcv() {
    try {
      const link = document.createElement('a');
      link.href = 'https://drive.google.com/uc?export=download&id=1V6tqGVMInUSF5zImOX0gso5ujZyUJrck';
      link.download = 'Deepak_Angular_developer.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('error while downloading cv', error);
    }
  }
}
