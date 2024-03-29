import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from "@Components/clients/clients.component";
import { ViewHistoryComponent } from "@Shared/components";

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
  },
  {
    path: ':client-id',
    component: ViewHistoryComponent,
    children: [
      {
        path: 'history',
        component: ViewHistoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
