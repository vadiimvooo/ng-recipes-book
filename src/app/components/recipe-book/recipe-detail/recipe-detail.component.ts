import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {RecipeService} from "../../../services/recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PopupService} from "../../../services/popup.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe!: Recipe;
  id!: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private popupService: PopupService
  ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      })
  }

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
    this.popupService.success("To shopping list", "Recipe ingredients were added to shopping list!")
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.popupService.success("Deleted", "Recipe was deleted successfully");
    this.router.navigate(["/recipes"]);
  }

  protected readonly requestAnimationFrame = requestAnimationFrame;
}
