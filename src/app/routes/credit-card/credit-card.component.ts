import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';
import { Message } from 'src/app/shared/messages/message';
import { CreditCardService } from 'src/app/shared/services/credit-card.service';
@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit {
  ccForm: FormGroup;
  // date = new FormControl(moment());

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private creditService: CreditCardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createCCForm();
  }

  createCCForm(): void {
    this.ccForm = this.fb.group({
      ccNumber: ['', Validators.required],
      ccHolder: ['', Validators.required],
      ccExpirationDate: [moment(), Validators.required],
      ccSecurityCode: null,
      ccAmount: ['', Validators.required],
    });
  }

  get expireDate() {
    return this.ccForm.get('ccExpirationDate');
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.expireDate.value;
    ctrlValue.year(normalizedYear.year());
    this.expireDate.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.expireDate.value;
    ctrlValue.month(normalizedMonth.month());
    this.expireDate.setValue(ctrlValue);
    if (this.expireDate.value < moment()) {
      this.snackbar.openFromComponent(SuccessSnackbarComponent, {
        data: {
          customMsg: Message.EXPIRATION_DATE_ERROR,
          type: 'error',
        },
      });
      this.expireDate.setValue('');
      this.expireDate.invalid;
    }
    datepicker.close();
  }

  onSubmit() {
    console.log(this.ccForm.value);
    if (this.ccForm.valid) {
      this.creditService
        .saveCreditCardDetails(this.ccForm.value)
        .subscribe((res) => {
          this.snackbar.openFromComponent(SuccessSnackbarComponent, {
            data: {
              customMsg: Message.CREDIT_CARD_ADDED_SUCCESS,
              type: 'success',
            },
          });
          this.routeBack();
        });
    } else {
      this.snackbar.openFromComponent(SuccessSnackbarComponent, {
        data: {
          customMsg: Message.CREDIT_CARD_ADDED_ERROR,
          type: 'error',
        },
      });
    }
  }

  routeBack(): void {
    this.router.navigate(['/credit-details']);
  }

  onCCNumChange(e: any, field: string) {
    if (e.charCode == 8 || e.charCode == 0 || e.charCode == 45) {
      return false;
    } else if (e.charCode >= 48 && e.charCode <= 57) {
      if (
        (this.ccForm.value.ccNumber.length === 4 ||
          this.ccForm.value.ccNumber.length === 9 ||
          this.ccForm.value.ccNumber.length === 14) &&
        field === 'ccNumber'
      ) {
        this.ccForm.get('ccNumber').setValue(this.ccForm.value.ccNumber + ' ');
      }
      if (
        field === 'ccSecurityCode' &&
        this.ccForm.value.ccSecurityCode &&
        this.ccForm.value.ccSecurityCode.length === 3
      ) {
        return false;
      }
      return true;
    } else return false;
  }
}
