import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { ICategory } from '../shared/models/category';
import { IType } from '../shared/models/serviceType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IService } from '../shared/models/service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7015/api/';
  services: IService[] = [];
  categories: ICategory[] = [];
  types: IType[] = [];

  constructor(private http: HttpClient) { }

  getServices(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.categoryId !== 0) {
      params = params.append('categoryId', shopParams.categoryId.toString());
    }

    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }


    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'services', { observe: 'response', params })
      .pipe(
        map(response => {
          this.services = response.body.data;
          return response.body;
        })
      );
  }

  getService(id: number) {
    const service = this.services.find(s => s.id === id);

    if (service) {
      return of(service);
    }

    return this.http.get<IService>(this.baseUrl + 'services/' + id);
  }


  getCategories() {
    if (this.categories.length > 0) {
      return of(this.categories);
    }
    return this.http.get<ICategory[]>(this.baseUrl + 'services/categories').pipe(
      map(response => {
        this.categories = response;
        return response;
      }));
  }

  getTypes() {
    if (this.types.length > 0) {
      return of(this.types);
    }
    return this.http.get<IType[]>(this.baseUrl + 'services/types').pipe(
      map(response => {
        this.types = response;
        return response;
      }));
  }

}
