import { IService } from './service';
export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IService[];
}
