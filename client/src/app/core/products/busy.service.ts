import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  //busyRequestCount = 0;

  //constructor(private spinnerService: NgxSpinnerService) { }

  //busy() {
  //  this.busyRequestCount++;
  //  this.spinnerService.show(undefined, {
  //    type: 'ball-scale-multiple',
  //    bdColor: 'rgba(255,255,255,0.7)',  // Spinner background color
  //    color: '#333333'                   // Spinner color
  //  });
  //}

  //idle() {
  //  this.busyRequestCount--;
  //  if (this.busyRequestCount <= 0) {
  //    this.busyRequestCount = 0;  // Reset to zero to avoid going negative
  //    this.spinnerService.hide();
  //  }
  //}
}
