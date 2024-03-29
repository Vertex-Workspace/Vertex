import { Pipe, PipeTransform } from '@angular/core';
import { PropertyList } from 'src/app/models/class/property';
import { Task } from 'src/app/models/class/task';
import { PipeParams } from 'src/app/models/interface/params';

@Pipe({
  name: 'statusSortPipe'
})
export class StatusSortPipe implements PipeTransform {

  transform(value: Task[], params: PipeParams): Task[] {
    
    if (params && params.type === 'status') {
      
      if (!params.kind) {

        return value.sort((a, b) => {
          const aStatusType = a.values[0].value as PropertyList;
          const bStatusType = b.values[0].value as PropertyList;  
          
          if (params.name!.indexOf(aStatusType.value) !== -1 && params.name!.indexOf(bStatusType.value) === -1) {
            return -1;
          }
          else if (params.name!.indexOf(bStatusType.value) !== -1 && params.name!.indexOf(aStatusType.value) === -1) {
            return 1;
          }
          else {
            return 0;
          }
        });
      } else {
        
        return value.sort((a, b) => {
          const aStatusType = a.values[0].value as PropertyList;
          const bStatusType = b.values[0].value as PropertyList;  
          
          if (params.kind!.indexOf(aStatusType.propertyListKind) !== -1 && params.kind!.indexOf(bStatusType.propertyListKind) === -1) {
            return -1;
          }
          else if (params.kind!.indexOf(bStatusType.propertyListKind) !== -1 && params.kind!.indexOf(aStatusType.propertyListKind) === -1) {
            return 1;
          }
          else {
            return 0;
          }
        });
      }
    }
    return value;
  }
}
