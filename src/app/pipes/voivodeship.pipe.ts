import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voivodeship',
})
export class VoivodeshipPipe implements PipeTransform {
  voivodeship: { [key: string]: string } = {
    lower_silesian: 'dolnośląskie',
    kuyavian_pomeranian: 'kujawsko-pomorskie',
    lublin: 'lubelskie',
    lubusz: 'lubuskie',
    lodz: 'łódzkie',
    lesser_poland: 'małopolskie',
    masovian: 'mazowieckie',
    opole: 'opolskie',
    subcarpathian: 'podkarpackie',
    podlaskie: 'podlaskie',
    pomeranian: 'pomorskie',
    silesian: 'śląskie',
    holy_cross: 'świętokrzyskie',
    warmian_masurian: 'warmińsko-mazurskie',
    greater_poland: 'wielkopolskie',
    west_pomeranian: 'zachodniopomorskie',
  };

  transform(value: string): string {
    return this.voivodeship[value];
  }
}
