import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './Components/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HomeTech';

  constructor(private dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(ModalComponent);
  }
}
