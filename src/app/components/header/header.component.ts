import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../../auth/auth/auth.service";
import {Subject, takeUntil} from "rxjs";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscriptionManager = new Subject();
  isAuthenticated: boolean = false;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.authService.user
      .pipe(takeUntil(this.subscriptionManager))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      })
  }

  ngOnDestroy() {
    this.subscriptionManager.complete()
  }

  onSaveData() {
    this.dataStorageService.saveRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
      .subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
