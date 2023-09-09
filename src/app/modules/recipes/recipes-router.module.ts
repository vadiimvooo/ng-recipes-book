import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RecipeBookComponent} from "./components/recipe-book/recipe-book.component";
import {RecipeStartComponent} from "./components/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./components/recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./components/recipe-detail/recipe-detail.component";
import {RecipeResolver} from "./components/recipe-book/recipe.resolver";
import {RecipesResolverService} from "./components/recipe-book/recipes-resolver.service";
import {AuthGuard} from "../auth/services/auth.guard";

const routes: Routes = [
  {path: 'recipes', component: RecipeBookComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolver]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver]}
    ]
    , resolve: [RecipesResolverService], canActivate: [AuthGuard]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRouterModule { }
