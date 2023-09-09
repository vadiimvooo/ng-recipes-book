import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";
import {PopupComponent} from "./components/popup/popup.component";
import {SharedRouterModule} from "./shared-router.module";



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    PopupComponent,
  ],
  imports: [
    CommonModule,
    SharedRouterModule
  ],
  exports: [
    LoadingSpinnerComponent,
    PopupComponent
  ]
})
export class SharedModule { }
