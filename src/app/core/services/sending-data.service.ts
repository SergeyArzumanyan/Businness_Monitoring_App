import { Injectable } from '@angular/core';
import { Database, ref, set } from "@angular/fire/database";

import {
  ISweet,
  IProductForSending
} from "@Core/interfaces";
import { ToastService } from "@Core/services";

@Injectable({
  providedIn: 'root'
})

export class SendingDataService {


  constructor(
    private db: Database,
    private toastService: ToastService
    ) {}


  public createSweet(sweet: ISweet): void {
    // set(ref(this.db , `sweets/${+(new Date())}`), sweet)
    set(ref(this.db , `sweets/${+(new Date())}`), sweet)
      .then(() => {
        this.toastService.showToast('success', 'Done', 'Sweet Created Successfully');
      })
      .catch(() => {
        this.toastService.showToast('error', 'Error', 'Failed To Create Sweet, Please Try Again');
      });
  }

  public createProduct(product: IProductForSending): void {
    set(ref(this.db, `products/${+(new Date())}`), product)
      .then(() => {
        this.toastService.showToast('success', 'Done', 'Product Created Successfully');
      })
      .catch(() => {
        this.toastService.showToast('error', 'Error', 'Failed To Create Product, Please Try Again');
      });
  }

}
