import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AuthComponent} from "./modules/auth/components/auth/auth.component";


const routes: Routes = [
  {path: '', redirectTo: 'recipes', pathMatch: "full"},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
