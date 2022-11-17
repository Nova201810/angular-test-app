import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(arr: any, filter: any) {
    const isFilterTransformAvailable = filter && Array.isArray(arr);
    if (!isFilterTransformAvailable) return arr;

    const filterKeys = Object.keys(filter);
    return arr.filter(item => (
      filterKeys.reduce((isMatched, keyName) => isMatched && item[keyName] === filter[keyName], true)
    ));
  }
}