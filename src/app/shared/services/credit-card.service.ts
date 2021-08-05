import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCardPaymentDetails } from '../models/credit-card-payment-details';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  bankDetails: CreditCardPaymentDetails[];

  constructor(private httpClient: HttpClient) {}

  saveCreditCardDetails(ccDetails: CreditCardPaymentDetails): Observable<CreditCardPaymentDetails> {
    return this.httpClient.post<CreditCardPaymentDetails>(
      'http://localhost:8080/api/addBankDetails',
      ccDetails
    );
  }

  setBankDetails(ccDetails: CreditCardPaymentDetails[]) {
    this.bankDetails = ccDetails;
  }

  getCreditCardDetails(): CreditCardPaymentDetails[] {
    return this.bankDetails;
  }
}
