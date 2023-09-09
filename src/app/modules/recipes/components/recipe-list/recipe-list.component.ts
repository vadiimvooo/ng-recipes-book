import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../../../../models/recipe.model";
import {RecipeService} from "../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipeChanges!: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.recipeChanges = this.recipeService.recipesChanged
      .subscribe((recipes) => {
        this.recipes = recipes;
      });

    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.recipeChanges.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {
      relativeTo: this.route
    })
  }
}
