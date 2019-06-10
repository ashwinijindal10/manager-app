import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const fullDate = new Date(value);
    const year = fullDate.getUTCFullYear();
    const month = fullDate.getUTCMonth();
    const date = fullDate.getUTCDate();
    const extension = this.dateDataForm(date);
    const shorterMonth = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    const updatedDateFormat = `${
      shorterMonth[month]
    } ${date}${extension}, ${year}`;
    return updatedDateFormat;
  }

  dateDataForm(date) {
    if (date > 3 && date < 21) { return 'th'; }
    switch (date % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
