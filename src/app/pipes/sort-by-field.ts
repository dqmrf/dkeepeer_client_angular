import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByField',
  pure: false
})

export class SortByFieldPipe implements PipeTransform {
  transform(items, field: string, desc: boolean = false) {
    if (items) {
      return items.sort((a, b) => {
        let A = getFormatted(a);
        let B = getFormatted(b);
        return !desc ? _sort(A, B) : _sort(B, A);
      });
    }

    function getFormatted(s) {
      return typeof s == 'string' ? s[field].toUpperCase() : s[field];
    }

    function _sort(A, B) {
      return (A < B) ? -1 : (A > B) ? 1 : 0;
    }
  }
}

