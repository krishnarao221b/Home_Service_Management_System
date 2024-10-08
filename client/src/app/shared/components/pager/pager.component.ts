import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import { NgxPaginationModule } from 'ngx-pagination';

import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pager',
  standalone: true,
  imports: [PaginationModule],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.scss'
})
export class PagerComponent implements OnInit {
  @Input() totalCount!: number;
  @Input() pageSize!: number;
  @Output() pageChanged = new EventEmitter<number>();
  constructor() { }
  ngOnInit() {  }
  onPagerChange(event: any) {
    this.pageChanged.emit(event.page);
  }
}
