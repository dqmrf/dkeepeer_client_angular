import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byField',
  pure: false
})

export class ByFieldPipe implements PipeTransform {
  transform(items, key, value) {
    if (items) {
      return items.filter((item) => item[key] === value);
    }
  }
}
