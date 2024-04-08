import { Pipe, PipeTransform } from '@angular/core';
import { SearchItem, SearchItemKind } from 'src/app/models/class/search-item';

@Pipe({
  name: 'searchAllFilterPipe',
})
export class SearchAllFilterPipe implements PipeTransform {

  transform(value: SearchItem[], params: SearchItemKind | null): SearchItem[] {
    console.log(params);
    
    if (!value || !params) {
      return value;
    }
    
    return value.filter((v: SearchItem) => {
      return v.kindAsString === params;
    });
  }

}
