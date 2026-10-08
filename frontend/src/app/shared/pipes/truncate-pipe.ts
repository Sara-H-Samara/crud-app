import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class Truncate implements PipeTransform {
  transform(value: string | null | undefined, limit = 20, ellipsis = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.slice(0, limit).trimEnd() + ellipsis : value;
  }
}
