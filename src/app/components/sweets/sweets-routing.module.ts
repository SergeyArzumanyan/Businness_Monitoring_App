import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SweetsComponent, SweetComponent } from "@Components/sweets";

const routes: Routes = [
  {
    path: "",
    component: SweetsComponent
  },
  {
    path: ":sweet-id",
    component: SweetComponent
  },
  {
    path: "**",
    redirectTo: "sweets",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SweetsRoutingModule { }
