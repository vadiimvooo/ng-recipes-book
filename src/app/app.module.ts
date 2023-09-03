import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingListEditComponent } from './components/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeListComponent } from './components/recipe-book/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/recipe-book/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './components/recipe-book/recipe-detail/recipe-detail.component';
import {RecipeBookComponent} from "./components/recipe-book/recipe-book.component";
import {NgOptimizedImage} from "@angular/common";
import {DropdownDirective} from "./components/shared/dropdown.directive";
import {NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ShoppingListService} from "./services/shopping-list.service";
import {ShoppingListComponent} from "./components/shopping-list/shopping-list.component";
import {AppRoutingModule} from "./app-routing.module";
import { RecipeStartComponent } from './components/recipe-book/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './components/recipe-book/recipe-edit/recipe-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RecipeService} from "./services/recipe.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { PopupComponent } from './components/popup/popup.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListEditComponent,
    ShoppingListComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeBookComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    NotFoundComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    NgbDropdownToggle,
    NgbDropdownMenu,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
