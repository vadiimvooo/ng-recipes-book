import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private idChange!: Subscription;
  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.idChange = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onEdit(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.idChange.unsubscribe();
  }
}



