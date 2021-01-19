import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptiveStatistics',
})
export class DescriptiveStatisticsPipe implements PipeTransform {
  describe: { [key: string]: string } = {
    min: 'minimum',
    max: 'maksimum',
    range: 'rozstęp',
    midrange: 'środek rozstępu',
    sum: 'suma',
    mean: 'średnia',
    median: 'mediana',
    variance: 'wariancja',
    standardDeviation: 'odchylenie standardowe',
    meanAbsoluteDeviation: 'średnie odchylenie bezwzględne',
  };

  transform(value: string): string {
    return this.describe[value];
  }
}
