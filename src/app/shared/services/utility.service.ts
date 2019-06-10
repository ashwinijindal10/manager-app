import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor() {}

  daysBetween(date1, date2) {
    // Get 1 day in milliseconds
    const one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    const date1_ms = date1.getTime();
    const date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    const difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms / one_day);
  }

  deepCopy = <T>(target: T): T => {
    if (target === null) {
      return target;
    }
    if (target instanceof Date) {
      return new Date(target.getTime()) as any;
    }
    if (target instanceof Array) {
      const cp = [] as any[];
      (target as any[]).forEach(v => {
        cp.push(v);
      });
      return cp.map((n: any) => this.deepCopy<any>(n)) as any;
    }
    if (typeof target === 'object' && target !== {}) {
      const cp = { ...(target as { [key: string]: any }) } as {
        [key: string]: any;
      };
      Object.keys(cp).forEach(k => {
        cp[k] = this.deepCopy<any>(cp[k]);
      });
      return cp as T;
    }
    return target;
  }
}
