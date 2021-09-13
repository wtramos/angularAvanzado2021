import { Component, OnInit } from '@angular/core';
import { CryptoFunctions } from 'src/app/global/utils/crypto.util';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface PaymentForm{
  name: string;
  card_number: string;
  cvv: string;
  date: string;
  amount: string|number;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  paymentForm: FormGroup;
  amount: number = 150;
  private readonly amountEncrypted = this.crypto.encryptAES(this.amount.toString());

  constructor(
    private crypto: CryptoFunctions,
    private formBuilder: FormBuilder
  ) { 
      this.paymentForm = this.formBuilder.group({
        name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
        date: [null, [Validators.required]],
        num: [null, [Validators.required, Validators.minLength(15), Validators.maxLength(16)]],
        cvv: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
      });
  }

  ngOnInit(): void {
  }

  onPay(): void {
    const {name, date, num, cvv} = this.paymentForm.controls;
    
    const payForm: PaymentForm = {
      name: name.value,
      date: date.value,
      card_number: num.value,
      cvv: cvv.value,
      amount: this.amountEncrypted
    }

    console.log(payForm);

    const token = this.crypto.encryptAES(payForm);

    console.log({token});

    const tokenDescrypted = this.crypto.descryptAES<string>(token);

    console.log({tokenDescrypted});
  }
}