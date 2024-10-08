import { Component, Input, OnInit } from '@angular/core';
import { IService } from '../../shared/models/service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-item.component.html',
  styleUrl: './service-item.component.scss'
})
export class ServiceItemComponent implements OnInit {

  @Input()service!: IService;

  constructor() { }

  ngOnInit() {

  }

}
