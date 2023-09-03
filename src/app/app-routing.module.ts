import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipeBookComponent} from "./components/recipe-book/recipe-book.component";
import {ShoppingListComponent} from "./components/shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "./components/recipe-book/recipe-detail/recipe-detail.component";
import {RecipeStartComponent} from "./components/recipe-book/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./components/recipe-book/recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "./components/recipe-book/recipes-resolver.service";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {RecipeResolver} from "./components/recipe-book/recipe.resolver";
import {AuthComponent} from "./auth/auth/auth.component";
import {AuthGuard} from "./auth/auth/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'recipes', pathMatch: "full"},
  {path: 'recipes', component: RecipeBookComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolver]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver]}
    ] , resolve: [RecipesResolverService], canActivate: [AuthGuard]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
