import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ChernoffShape } from '../ChernoffShape';

declare module 'd3' {
  function chernoff(): any;
  namespace layout {
    function grid(): any;
  }
}

export type Dimension = {
  x: number;
  y: number;
};

function sign(num: number) {
  if (num > 0) {
    return 1;
  } else if (num < 0) {
    return -1;
  } else {
    return 0;
  }
}
// face -- shape of the face {0..1}
// hair -- shape of the hair {-1..1}
// mouth -- shape of the mouth {-1..1}
// noseh -- height of the nose {0..1}
// nosew -- width of the nose {0..1}
// eyeh -- height of the eyes {0..1}
// eyew -- width of the eyes {0..1}
// brow -- slant of the brows {-1..1}
function d3_chernoff() {
  var facef: any = 0.5,
    hairf: any = 0,
    mouthf: any = 0,
    nosehf: any = 0.5,
    nosewf: any = 0.5,
    eyehf: any = 0.5,
    eyewf: any = 0.5,
    browf: any = 0,
    label: any = '',
    line = d3.svg
      .line<Dimension>()
      .interpolate('cardinal-closed')
      .x(function (d) {
        return d.x;
      })
      .y(function (d) {
        return d.y;
      }),
    bline = d3.svg
      .line<Dimension>()
      .interpolate('basis-closed')
      .x(function (d) {
        return d.x;
      })
      .y(function (d) {
        return d.y;
      });

  function chernoff(this: any, a: { each: (this: any, d: any) => void }) {
    if (a instanceof Array) {
      a.each(__chernoff);
    } else {
      d3.select(this).each(__chernoff);
    }
  }

  function __chernoff(this: any, d: any) {
    const ele = d3.select(this),
      facevar = (typeof facef === 'function' ? facef(d) : facef) * 30,
      hairvar = (typeof hairf === 'function' ? hairf(d) : hairf) * 80,
      mouthvar = (typeof mouthf === 'function' ? mouthf(d) : mouthf) * 7,
      nosehvar = (typeof nosehf === 'function' ? nosehf(d) : nosehf) * 10,
      nosewvar = (typeof nosewf === 'function' ? nosewf(d) : nosewf) * 10,
      eyehvar = (typeof eyehf === 'function' ? eyehf(d) : eyehf) * 10,
      eyewvar = (typeof eyewf === 'function' ? eyewf(d) : eyewf) * 10,
      browvar = (typeof browf === 'function' ? browf(d) : browf) * 3;

    const face = [
      { x: 70, y: 60 },
      { x: 120, y: 80 },
      { x: 120 - facevar, y: 110 },
      { x: 120 - facevar, y: 160 },
      { x: 20 + facevar, y: 160 },
      { x: 20 + facevar, y: 110 },
      { x: 20, y: 80 },
    ];
    ele
      .selectAll('path.face')
      .data([face])
      .enter()
      .append('path')
      .attr('class', 'face')
      .attr('d', bline);

    var hair = [
      { x: 70, y: 60 },
      { x: 120, y: 80 },
      { x: 140, y: 45 - hairvar },
      { x: 120, y: 45 },
      { x: 70, y: 30 },
      { x: 20, y: 45 },
      { x: 0, y: 45 - hairvar },
      { x: 20, y: 80 },
    ];
    ele
      .selectAll('path.hair')
      .data([hair])
      .enter()
      .append('path')
      .attr('class', 'hair')
      .attr('d', bline);

    var mouth = [
      { x: 70, y: 130 + mouthvar },
      { x: 110 - facevar, y: 135 - mouthvar },
      { x: 70, y: 140 + mouthvar },
      { x: 30 + facevar, y: 135 - mouthvar },
    ];
    ele
      .selectAll('path.mouth')
      .data([mouth])
      .enter()
      .append('path')
      .attr('class', 'mouth')
      .attr('d', line);

    var nose = [
      { x: 70, y: 110 - nosehvar },
      { x: 70 + nosewvar, y: 110 + nosehvar },
      { x: 70 - nosewvar, y: 110 + nosehvar },
    ];
    ele
      .selectAll('path.nose')
      .data([nose])
      .enter()
      .append('path')
      .attr('class', 'nose')
      .attr('d', line);

    var leye = [
      { x: 55, y: 90 - eyehvar },
      { x: 55 + eyewvar, y: 90 },
      { x: 55, y: 90 + eyehvar },
      { x: 55 - eyewvar, y: 90 },
    ];
    var reye = [
      { x: 85, y: 90 - eyehvar },
      { x: 85 + eyewvar, y: 90 },
      { x: 85, y: 90 + eyehvar },
      { x: 85 - eyewvar, y: 90 },
    ];
    ele
      .selectAll('path.leye')
      .data([leye])
      .enter()
      .append('path')
      .attr('class', 'leye')
      .attr('d', bline);
    ele
      .selectAll('path.reye')
      .data([reye])
      .enter()
      .append('path')
      .attr('class', 'reye')
      .attr('d', bline);

    ele
      .append('path')
      .attr('class', 'lbrow')
      .attr(
        'd',
        'M' +
          (55 - eyewvar / 1.7 - sign(browvar)) +
          ',' +
          (87 - eyehvar + browvar) +
          ' ' +
          (55 + eyewvar / 1.7 - sign(browvar)) +
          ',' +
          (87 - eyehvar - browvar)
      );
    ele
      .append('path')
      .attr('class', 'rbrow')
      .attr(
        'd',
        'M' +
          (85 - eyewvar / 1.7 + sign(browvar)) +
          ',' +
          (87 - eyehvar - browvar) +
          ' ' +
          (85 + eyewvar / 1.7 + sign(browvar)) +
          ',' +
          (87 - eyehvar + browvar)
      );
    ele
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', 70)
      .attr('y', 175)
      .attr('font-size', '16px')
      .text(label);
  }

  chernoff.face = function (x: number) {
    if (!arguments.length) return facef;
    facef = x;
    return chernoff;
  };

  chernoff.hair = function (x: number) {
    if (!arguments.length) return hairf;
    hairf = x;
    return chernoff;
  };

  chernoff.mouth = function (x: number) {
    if (!arguments.length) return mouthf;
    mouthf = x;
    return chernoff;
  };

  chernoff.noseh = function (x: number) {
    if (!arguments.length) return nosehf;
    nosehf = x;
    return chernoff;
  };

  chernoff.nosew = function (x: number) {
    if (!arguments.length) return nosewf;
    nosewf = x;
    return chernoff;
  };

  chernoff.eyeh = function (x: number) {
    if (!arguments.length) return eyehf;
    eyehf = x;
    return chernoff;
  };

  chernoff.eyew = function (x: number) {
    if (!arguments.length) return eyewf;
    eyewf = x;
    return chernoff;
  };

  chernoff.brow = function (x: number) {
    if (!arguments.length) return browf;
    browf = x;
    return chernoff;
  };

  chernoff.label = function (x: string) {
    if (!arguments.length) return label;
    label = x;
    return chernoff;
  };

  return chernoff;
}

(d3 as any).chernoff = function () {
  return d3_chernoff();
};

(d3.layout as any).grid = function () {
  var layout = _distributeEqually,
    x = d3.scale.ordinal<number, number>(),
    y = d3.scale.ordinal<number, number>(),
    size = [1, 1],
    actualSize = [0, 0],
    nodeSize = false,
    bands = false,
    padding = [0, 0],
    cols: number,
    rows: number;

  function grid(nodes: any[]) {
    return layout(nodes);
  }

  function _distributeEqually(nodes: any[]) {
    var i = -1,
      n = nodes.length,
      _cols = cols ? cols : 0,
      _rows = rows ? rows : 0,
      col: number,
      row: number;

    if (_rows && !_cols) {
      _cols = Math.ceil(n / _rows);
    } else {
      _cols || (_cols = Math.ceil(Math.sqrt(n)));
      _rows || (_rows = Math.ceil(n / _cols));
    }

    if (nodeSize) {
      x.domain(d3.range(_cols)).range(
        d3.range(0, (size[0] + padding[0]) * _cols, size[0] + padding[0])
      );
      y.domain(d3.range(_rows)).range(
        d3.range(0, (size[1] + padding[1]) * _rows, size[1] + padding[1])
      );
      actualSize[0] = bands ? x(_cols - 1) + size[0] : x(_cols - 1);
      actualSize[1] = bands ? y(_rows - 1) + size[1] : y(_rows - 1);
    } else if (bands) {
      x.domain(d3.range(_cols)).rangeBands([0, size[0]], padding[0], 0);
      y.domain(d3.range(_rows)).rangeBands([0, size[1]], padding[1], 0);
      actualSize[0] = x.rangeBand();
      actualSize[1] = y.rangeBand();
    } else {
      x.domain(d3.range(_cols)).rangePoints([0, size[0]]);
      y.domain(d3.range(_rows)).rangePoints([0, size[1]]);
      actualSize[0] = x(1);
      actualSize[1] = y(1);
    }

    while (++i < n) {
      col = i % _cols;
      row = Math.floor(i / _cols);
      nodes[i].x = x(col);
      nodes[i].y = y(row);
    }

    return nodes;
  }

  grid.size = function (value: number[]) {
    if (!arguments.length) return nodeSize ? actualSize : size;
    actualSize = [0, 0];
    nodeSize = (size = value) == null;
    return grid;
  };

  grid.nodeSize = function (value: number[]) {
    if (!arguments.length) return nodeSize ? size : actualSize;
    actualSize = [0, 0];
    nodeSize = (size = value) != null;
    return grid;
  };

  grid.rows = function (value: number) {
    if (!arguments.length) return rows;
    rows = value;
    return grid;
  };

  grid.cols = function (value: number) {
    console.log(value);
    if (!arguments.length) return cols;
    cols = value;
    return grid;
  };

  grid.bands = function () {
    bands = true;
    return grid;
  };

  grid.points = function () {
    bands = false;
    return grid;
  };

  grid.padding = function (value: number[]) {
    if (!arguments.length) return padding;
    padding = value;
    return grid;
  };

  return grid;
};

@Component({
  selector: 'app-chernoff-face',
  template: '',
  styles: [],
})
export class ChernoffFaceComponent implements OnInit {
  @Input() data: ChernoffShape[];

  constructor() {
    this.data = [];
  }

  ngOnInit(): void {
    const customCall = d3
      .chernoff()
      .face((d: ChernoffShape) => {
        return d.face;
      })
      .hair((d: ChernoffShape) => {
        return d.hair;
      })
      .mouth((d: ChernoffShape) => {
        return d.mouth;
      })
      .nosew((d: ChernoffShape) => {
        return d.nosew;
      })
      .noseh((d: ChernoffShape) => {
        return d.noseh;
      })
      .eyew((d: ChernoffShape) => {
        return d.eyew;
      })
      .eyeh((d: ChernoffShape) => {
        return d.eyeh;
      })
      .brow((d: ChernoffShape) => {
        return d.brow;
      })
      .label((d: ChernoffShape) => {
        return d.label;
      });

    var width = '100%',
      height = '100%';

    var rectGrid = d3.layout.grid().bands().size([360, 360]).padding([1.8, 2]);

    const viewBox = this.data.length === 1 ? '0 0 250 250' : '0 0 650 750';

    var svg = d3
      .select('#face')
      .append('svg:svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', viewBox);

    svg
      .selectAll('g.chernoff')
      .data(rectGrid(this.data))
      .enter()
      .append('g')
      .attr('width', rectGrid.nodeSize()[0])
      .attr('height', rectGrid.nodeSize()[1])
      .attr('class', 'chernoff')
      .attr('transform', (d: any) => {
        return (
          'translate(' +
          (d.x + (this.data.length === 1 ? 50 : 0)) +
          ',' +
          (d.y + (this.data.length === 1 ? 25 : 0)) +
          ')'
        );
      })
      .call(customCall);
  }
}
