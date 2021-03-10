import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string): any[] {
    let resultArray : any[] = [];
    if (value.length === 0 || filterString === ''){
      return value;
    }
    let input = filterString.toUpperCase()
    for (let item of value){
      if ((item['title'].toUpperCase().indexOf(input) > -1) || (item['genre'].toUpperCase().indexOf(input) > -1)){
        resultArray.push(item);
      }
    }
    return resultArray
  }

}
