import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRouterModule} from "./auth-router.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRouterModule,
    SharedModule
  ]
})
export class AuthModule { }
