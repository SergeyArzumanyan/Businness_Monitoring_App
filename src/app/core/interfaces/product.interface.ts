import { FormControl } from "@angular/forms";

export interface  IProduct {
  ID: number;
  Name: string;
  Price: number;
  Quantity: number;
  TotalPrice?: number;
}

export interface IProductForm {
  ID: FormControl<number | null>;
  Name: FormControl<string | null>;
  Price: FormControl<number | null>;
}

export interface IProductForSending {
  ID: number | null;
  Name: string | null;
  Price: number | null;
}
