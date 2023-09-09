import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../../services/data-storage.service";
import {AuthService} from "../../modules/auth/services/auth.service";
import {Subject, takeUntil} from "rxjs";
import {PopupService} from "../../modules/shared/services/popup.service";

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
    private popupService: PopupService
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
      .subscribe({
        next: () => {
          this.popupService.success("Success", "Data was fetched successful");
        },
        error: () => {
          this.popupService.error("Failure", "Fetching the data was unsuccessful");
        }
      });
  }

  onLogout() {
    this.authService.logout();
  }
}
