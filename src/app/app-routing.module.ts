import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditCardDetailsComponent } from './routes/credit-card-details/credit-card-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/credit-details' },
  { path: 'credit-details', component: CreditCardDetailsComponent },
  {
    path: 'credit-card-payment',
    loadChildren: () =>
      import('./routes/credit-card/credit-card.module').then(
        (module) => module.CreditCardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
