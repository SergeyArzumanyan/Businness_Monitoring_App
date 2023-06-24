import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Subject, Subscription, takeUntil } from "rxjs";

import {
  ISweet,
  IProduct,
  firebaseItemDeletion,
} from "@Core/interfaces";
import {
  RequestsService,
  DeleteService,
  ToastService,
  CalculationService,
} from "@Core/services";

import { ConfirmationService } from "primeng/api";

@Component({
  selector: 'app-sweets',
  templateUrl: './sweets.component.html',
  styleUrls: ['./sweets.component.scss']
})
export class SweetsComponent implements OnInit, OnDestroy {

  public sweets: ISweet[] = [];
  private subscribeToSweetChanges: Subscription | null = null;

  public stopLoading: boolean = false;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private Request: RequestsService,
    private Deletion: DeleteService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private calculationService: CalculationService,
  ) {}

  ngOnInit(): void {
    this.requestSweets();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private requestSweets(): void {
    this.subscribeToSweetChanges = this.Request.getSweets()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (sweets: ISweet[] | null) => {
          this.sweets = sweets ? this.Request.makeArray(sweets) : [];
          this.getProductsBasedOnSweets(this.sweets);

          setTimeout(() => {
            if (this.sweets.length === 0) {
              this.stopLoading = true;
            }
          }, 5000);
        },
        error: () => {
          this.toastService.showToast('error', 'Error', 'Failed To Get Sweets');

        }
      })
  }

  private getProductsBasedOnSweets(sweets: ISweet[]): void {
    for (const sweet of sweets) {
      if (sweet.Products) {
        for (const product of sweet.Products) {
          const productQuantity = product.Quantity;

          this.Request.getProductsBasedOnSweet(product.ProductID)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
              next: (product: IProduct[]) => {
                this.calculationService.calculateSweetPriceInSweets(sweet, product, productQuantity);
              },
              error: (err: HttpErrorResponse) => {
                this.toastService.showToast('error', 'Error', err.message);
              }
            })
        }
      }
    }
  }

  public deleteSweet(sweet: ISweet): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this sweet?',
      header: 'Delete Sweet ?',
      icon: 'pi pi-trash icon-big',
      accept: () => {
        this.Deletion.deleteItem('sweets', 'ID', sweet.ID)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((action: firebaseItemDeletion[]) => {
            this.Deletion.removeItem('sweets', action[0].payload.key, 'Sweet', false);
          });
      }
    });
  }
}
