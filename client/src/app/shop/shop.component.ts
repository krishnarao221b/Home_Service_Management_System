import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IService } from '../shared/models/service';
import { ShopService } from './shop.service';
import { CommonModule } from '@angular/common';
import { ServiceItemComponent } from './service-item/service-item.component';
import { IType } from '../shared/models/serviceType';
import { ICategory } from '../shared/models/category';
import { ShopParams } from '../shared/models/shopParams';
import { AppComponent } from '../app.component';
import { PagingHeaderComponent } from '../shared/components/paging-header/paging-header.component';
import { PagerComponent } from '../shared/components/pager/pager.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule,ServiceItemComponent, AppComponent, PagingHeaderComponent, PagerComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: true }) searchTerm!: ElementRef;
  services: IService[] = [];
  categories: ICategory[] = [];
  types: IType[] = [];
  shopParams = new ShopParams();
  totalCount!: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.getServices();
    this.getCategories();
    this.getTypes();
  }

  getServices() {
    this.shopService.getServices(this.shopParams).subscribe(response => {
      this.services = response?.data || [];
      this.shopParams.pageNumber = response?.pageIndex || 0;
      this.shopParams.pageSize = response?.pageSize || 0;
      this.totalCount = response?.count || 0;
    }, error => {
      console.log(error);
    });
  }
    getCategories() {
      this.shopService.getCategories().subscribe(response => {
        this.categories = [{id: 0, name: 'All'}, ...response];
      }, error => {
        console.log(error);
      });
    }

    getTypes() {
      this.shopService.getTypes().subscribe(response => {
        this.types = [{ id: 0, name: 'All' }, ...response];;
      }, error => {
        console.log(error);
      });
  }

  onCategorySelected(categoryId: number) {
    this.shopParams.categoryId = categoryId;
    this.shopParams.pageNumber = 1;
    this.getServices();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getServices();
  }

  onSortSelected(sort: Event) {
    const element = sort.target as HTMLSelectElement
    this.shopParams.sort = element.value;
    this.getServices();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getServices();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getServices();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getServices();
  }


}

