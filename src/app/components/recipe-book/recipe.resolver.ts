import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {RecipeService} from "../../services/recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<boolean> {
  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id: number = +route.params['id'];
    const recipes = this.recipeService.getRecipes();

    if (!recipes[id]) {
      this.router.navigate(['not-found']);
    }

    return of(true);
  }
}
