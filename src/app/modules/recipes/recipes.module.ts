import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipeListComponent} from "./components/recipe-list/recipe-list.component";
import {RecipeItemComponent} from "./components/recipe-list/recipe-item/recipe-item.component";
import {RecipeDetailComponent} from "./components/recipe-detail/recipe-detail.component";
import {RecipeBookComponent} from "./components/recipe-book/recipe-book.component";
import {RecipeStartComponent} from "./components/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./components/recipe-edit/recipe-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbDropdownMenu, NgbDropdownToggle, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RecipesRouterModule} from "./recipes-router.module";

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeBookComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    CommonModule,
    RecipesRouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbDropdownToggle,
    NgbDropdownMenu,
  ]
})
export class RecipesModule { }
