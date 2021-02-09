import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditDetailsRoutingModule } from './credit-details-routing.module';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CreditDetailsRoutingModule, RootMaterialModule],
})
export class CreditDetailsModule {}
