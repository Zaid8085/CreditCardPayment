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
    let data = this.creditCardService.getCreditCardDetails();
    data.sort((a, b) => Number(new Date(b['date'])) - Number(new Date((a['date']))))
    data.forEach((resp: CreditCardPaymentDetails) => {
      resp.date = moment(resp.date)
        .format('MMM-YYYY')
              .toString();
      resp.cardNumber = resp.cardNumber.replace(resp.cardNumber.substring(5, resp.cardNumber.length), "**** **** ****")
    });


    this.dataSource = data;
  }
}
