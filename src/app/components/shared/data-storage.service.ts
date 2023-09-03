import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Recipe } from './recipe.model';
import { RecipeService } from '../../services/recipe.service';
import {User} from "../../auth/user.model";
import {urls} from "../../const/urls";

export interface IUserLocalStorage {
  id: string,
  email: string,
  _token: string,
  _tokenExpirationDate: Date
}


@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
  ) {}

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        urls.recipes,
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        urls.recipes
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }


  getUserData() {
    const userData = localStorage.getItem("userData");
    let user: IUserLocalStorage | null = null;

    if (userData) {
      user = JSON.parse(userData);
    }


    return user;
  }

  addUserData(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  removeUserData() {
    localStorage.removeItem('userData');
  }
}