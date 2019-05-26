import { Component, OnInit } from '@angular/core';
import { ToastService, ToastType } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.less']
})
export class ContactUsComponent implements OnInit {
  constructor(private toast: ToastService) {}
  walkthroughStep = 1;

  ngOnInit() {}
  onSend() {
    this.toast.show('پیام شما با موفقیت ارسال شد!', '', ToastType.SUCCESS);
  }

  walkthrough() {
    if (this.walkthroughStep < 4) {
      this.walkthroughStep++;
    }
  }
}
