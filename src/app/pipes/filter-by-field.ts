import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByField',
  pure: false
})

export class FilterByFieldPipe implements PipeTransform {
  transform(items, key, value) {
    if (items) {
      return items.filter((item) => item[key] === value);
    }
  }
}
