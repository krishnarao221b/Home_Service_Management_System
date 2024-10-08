import { Component, OnInit } from '@angular/core';
import { IService } from '../../shared/models/service';
import { ShopService } from '../shop.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss'
})
export class ServiceDetailsComponent implements OnInit {

  service!: IService;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.loadService();
  }

  loadService() {
    // Subscribe to paramMap to get the route parameter 'id'
    this.activateRoute.paramMap.subscribe(params => {
      const id = params.get('id'); // Get 'id' from route
      if (id) {
        // Call getService with the parsed id
        this.shopService.getService(+id).subscribe(service => {
          this.service = service;
          this.bcService.set('@serviceDetails', service.name);
        }, error => {
          console.log(error);
        });
      }
    });
  }
}
