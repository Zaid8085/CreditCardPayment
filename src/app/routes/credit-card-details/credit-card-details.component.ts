import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CreditCardPaymentDetails } from 'src/app/shared/models/credit-card-payment-details';
import { CreditCardService } from '../../shared/services/credit-card.service';
import { columns, displayedColumns } from './configs/credit.config';

@Component({
  selector: 'app-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.scss'],
})
export class CreditCardDetailsComponent implements OnInit {
  columns = columns;
  displayedColumns = displayedColumns;
  dataSource: any;
  constructor(private creditCardService: CreditCardService) {}

  ngOnInit(): void {
    this.getCreditDetails();
  }

  getCreditDetails() {
    this.creditCardService
      .getCreditCardDetails()
      .subscribe((data: CreditCardPaymentDetails[]) => {
        console.log(data);
        if (data.length > 0) {
          data.forEach((resp: CreditCardPaymentDetails) => {
            resp.ccExpirationDate = moment(resp.ccExpirationDate)
              .format('MM/YYYY')
              .toString();
          });
        }
        this.dataSource = data;
      });
  }
}
