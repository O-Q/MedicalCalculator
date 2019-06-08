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

  ngOnInit() {
    const _cwt = localStorage.getItem('c-wt');
    if (_cwt === 'true') {
      this.walkthroughStep = 0;
    } else {
      localStorage.setItem('c-wt', 'true');
    }
  }
  onSend() {
    this.toast.show('پیام شما با موفقیت ارسال شد!', '', ToastType.SUCCESS);
  }

  walkthrough() {
    const _cwt = localStorage.getItem('c-wt');
    if (_cwt === 'false') {
      this.walkthroughStep = 0;
      return;
    }
    if (this.walkthroughStep < 4) {
      this.walkthroughStep++;
    }
  }
}
