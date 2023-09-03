import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../../services/shopping-list.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy{
  ingredientInfo!: FormGroup;
  subscription!: Subscription;
  editedItemIndex!: number;
  editMode = false;
  editedItem!: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredientInfo = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.minLength(3)]),
      'amount': new FormControl("", [Validators.required, Validators.min(1)])
    });

    this.subscription = this.shoppingListService.startedEditing
      .subscribe((index) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.ingredientInfo.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, this.ingredientInfo.value);
    } else {
      const ingredient = new Ingredient(
        this.ingredientInfo.value.name,
        this.ingredientInfo.value.amount
      )
      this.shoppingListService.addIngredient(ingredient);
    }

    this.onClear()
  }



  onDelete() {
    this.onClear();
    this.shoppingListService.removeIngredient(this.editedItemIndex);
  }

  onClear() {
    this.ingredientInfo.reset();
    this.editMode = false;
  }
}
