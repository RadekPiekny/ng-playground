import { Component, OnInit, HostBinding } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  subscription: Subscription;
  provider = this.modalService.provider.pipe(
    take(1)
  );
  @HostBinding('class.visible') visible = () => true;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.subscription = this.provider.subscribe(
      null,
      null,
      () => console.log("end")
    )
  }

  end(confirm: boolean) {
    this.modalService.close();
  }

}
