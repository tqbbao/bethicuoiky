export enum OrderOptions {
  ASC = 'ASC',
  DESC = 'DESC'
}

export class PaginationOptions {
    page: number;
    limit: number;
    sort: string;
    sort_by: OrderOptions
  }
  