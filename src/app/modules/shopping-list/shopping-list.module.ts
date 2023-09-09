import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShoppingListEditComponent} from "./components/shopping-list-edit/shopping-list-edit.component";
import {ShoppingListComponent} from "./components/shopping-list/shopping-list.component";
import {ShoppingListRouterModule} from "./shopping-list-router.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ShoppingListEditComponent,
    ShoppingListComponent,
  ],
  imports: [
    CommonModule,
    ShoppingListRouterModule,
    ReactiveFormsModule,
  ]
})
export class ShoppingListModule { }
