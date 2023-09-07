import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {trigger, state, style, transition, animate} from "@angular/animations";
import {PopupService, popupTypes} from "../../services/popup.service";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'closed',
        style({
          visibility: 'hidden',
          right: '-400px'
        })
      ),
      state(
        'open',
        style({
          right: '40px'
        })
      ),
      transition('open <=> closed', [animate('0.5s ease-in-out')]),
    ])
  ]
})
export class PopupComponent implements OnInit {
  @ViewChild('element', { static: false }) progressBar!: ElementRef;
  progressInterval!: any;
  barInterval!: any;
  type!: popupTypes;

  constructor(
    public popupService: PopupService
  ) {
  }

  ngOnInit() {
    this.popupService.open
      .subscribe((data) => {
        this.type = data.type;

        if (data.show) {
          this.countDown();
        }
      })
  }

  countDown() {
    this.progressBar.nativeElement.style.width = this.popupService.data.progressWidth;
    this.progressInterval = setInterval(() => {
      this.barInterval = setInterval(() => {
        const width = parseInt(this.progressBar.nativeElement.style.width, 10)

        if (width <= 0) {
          clearInterval(this.progressInterval);
          clearInterval(this.barInterval);
          this.popupService.hide();
          return;
        }

        this.popupService.data.progressWidth = String(width - 1);
        this.progressBar.nativeElement.style.width = this.popupService.data.progressWidth + '%';
        clearInterval(this.barInterval);
      }, 3)
    }, 30)
  }

  stopCountDown() {
    clearInterval(this.progressInterval);
    clearInterval(this.barInterval);
  }

  disablePopup() {
    this.popupService.hide();
  }
}
