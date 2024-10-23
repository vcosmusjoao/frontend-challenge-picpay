import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  payments: any[] = [];

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.paymentService.getPayments().subscribe((data) => {
      this.payments = data;
    });
  }

  deletePayment(id: number) {
    this.paymentService.deletePayment(id).subscribe(() => {
      this.payments = this.payments.filter(payment => payment.id !== id);
    });
  }
}
