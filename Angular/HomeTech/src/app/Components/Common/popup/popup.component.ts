import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() message!: string;
  @Input() title!: string;
  @Input() isSuccess!: boolean;

  constructor(public modal: NgbActiveModal) { }
}
