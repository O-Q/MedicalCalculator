import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitFa'
})
export class UnitFaPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case 'kg':
        return 'کیلوگرم';
      case 'lbs':
        return 'پوند';
      case 'year':
        return 'سال';
      case 'cm':
        return 'سانتی‌متر';
      case 'in':
        return 'اینچ';
      case 'mmolL':
        return 'میکرومول بر لیتر';
      case 'mgdl':
        return 'میلی‌‌گرم بر دسی‌لیتر';
      case 'mlkg':
        return 'میلی‌لیتر بر کیلوگرم';
      case 'ml':
        return 'میلی‌‌لیتر';
      case 'kPa':
        return 'کیلوپاسکال';
      case 'mmHg':
        return 'میلی‌متر جیوه';
    }
  }
}
