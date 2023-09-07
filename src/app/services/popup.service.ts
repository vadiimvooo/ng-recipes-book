import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

export enum popupTypes {
  error,
  success,
  warning
}

export interface PopupData {
  title: string,
  content: string,
  type: popupTypes,
  show?: boolean,
  progressWidth?: string
}

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  data!: PopupData;
  public open = new Subject<PopupData>()
  constructor() { }


  hide() {
    this.data = { ...this.data, show: false };
    this.open.next(this.data);
  }

  success(title: string, content: string) {
    this.initiate({
      title,
      content,
      type: popupTypes.success,
    })
  }

  error(title: string, content: string) {
    this.initiate({
      title,
      content,
      type: popupTypes.error,
    })
  }

  warning(title: string, content: string) {
    this.initiate({
      title,
      content,
      type: popupTypes.warning,
    })
  }

  private initiate(data: PopupData) {
    this.data = { ...data, show: true, progressWidth: '100%'};
    this.open.next(this.data);
  }
}
