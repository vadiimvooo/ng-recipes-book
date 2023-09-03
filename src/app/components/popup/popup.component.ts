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
      const width = parseInt(this.progressBar.nativeElement.style.width, 10)

      if (width <= 0) {
        this.popupService.hide();
        clearInterval(this.progressInterval);
        return;
      }

      this.popupService.data.progressWidth = String(width - 10);
      this.progressBar.nativeElement.style.width = this.popupService.data.progressWidth + '%';
    }, 150)
  }

  stopCountDown() {
    clearInterval(this.progressInterval);
  }

  disablePopup() {
    this.popupService.hide();
  }
}
