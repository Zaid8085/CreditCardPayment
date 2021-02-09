import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditCardDetailsComponent } from './credit-card-details.component';

const routes: Routes = [
  // { path: 'credit-details', component: CreditCardDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditDetailsRoutingModule {}
