import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(items: any[], sortKey: string, sortOrder: string): any[] {
    if (!items) {
      return [];
    }

    return items.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return sortOrder === 'asc' ? -1 : 1;
      } else if (a[sortKey] > b[sortKey]) {
        return sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

  }

}
