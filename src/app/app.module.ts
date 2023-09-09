import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {NgOptimizedImage} from "@angular/common";
import {NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from "./app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthComponent } from './modules/auth/components/auth/auth.component';
import { AuthInterceptorService } from "./modules/auth/services/auth-interceptor.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RecipesModule} from "./modules/recipes/recipes.module";
import {ShoppingListModule} from "./modules/shopping-list/shopping-list.module";
import {ShoppingListService} from "./services/shopping-list.service";
import {SharedModule} from "./modules/shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    AuthComponent,
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
    BrowserAnimationsModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    ShoppingListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
