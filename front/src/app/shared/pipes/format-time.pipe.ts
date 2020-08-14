import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'formatTimePipe'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: string): string {
		const values = value.split(':');
	
		return values[0] + ':' + values[1] + ':' + values[1];
	}	
}