interface DescriptiveStatisticsAll {
  min: number;
  max: number;
  range: number;
  midrange: number;
  sum: number;
  mean: number;
  median: number;
  variance: number;
  standardDeviation: number;
  meanAbsoluteDeviation: number;
}

export class DescriptiveStatistics {
  static min(array: number[]) {
    return Math.min(...array);
  }

  static max(array: number[]) {
    return Math.max(...array);
  }

  static range(array: number[]) {
    return this.max(array) - this.min(array);
  }

  static midrange(array: number[]) {
    return this.range(array) / 2;
  }

  static sum(array: number[]) {
    return array.reduce((prev, curr) => (prev += curr), 0);
  }

  static mean(array: number[]) {
    return this.sum(array) / array.length;
  }

  static median(array: number[]) {
    array.sort((a, b) => a - b);
    const mid = array.length / 2;
    return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
  }

  static variance(array: number[]) {
    const mean = this.mean(array);
    return this.mean(array.map((num) => Math.pow(num - mean, 2)));
  }

  static standardDeviation(array: number[]) {
    return Math.sqrt(this.variance(array));
  }

  static meanAbsoluteDeviation(array: number[]) {
    const mean = this.mean(array);
    return this.mean(array.map((num) => Math.abs(num - mean)));
  }

  static zScores(array: number[]) {
    const mean = this.mean(array);
    const standardDeviation = this.standardDeviation(array);
    return array.map((num) => (num - mean) / standardDeviation);
  }

  static normalize(
    min: number,
    max: number,
    x: number,
    range: [number, number]
  ) {
    return (range[1] - range[0]) * ((x - min) / (max - min)) + range[0];
  }

  static normalizeArray(array: number[], range: [number, number]) {
    return array.map(
      (num) =>
        (range[1] - range[0]) *
          ((num - this.min(array)) / (this.max(array) - this.min(array))) +
        range[0]
    );
  }

  static getAll(array: number[]): DescriptiveStatisticsAll {
    return {
      min: this.min(array),
      max: this.max(array),
      range: this.range(array),
      midrange: this.midrange(array),
      sum: this.sum(array),
      mean: this.mean(array),
      median: this.median(array),
      variance: this.variance(array),
      standardDeviation: this.standardDeviation(array),
      meanAbsoluteDeviation: this.meanAbsoluteDeviation(array),
    };
  }
}
