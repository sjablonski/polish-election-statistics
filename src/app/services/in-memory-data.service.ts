import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const statistics = [
      {
        voivodeship: 'lower_silesian',
        entitledVote: 2240376,
        issuedBallots: 1487041,
        correspondenceVotes: 14091,
        totalValidVotes: 1487940,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 663831,
            percent: 0.4461,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 824109,
            percent: 0.5539,
          },
        ],
      },
      {
        voivodeship: 'kuyavian_pomeranian',
        entitledVote: 1572933,
        issuedBallots: 1019344,
        correspondenceVotes: 8088,
        totalValidVotes: 1019200,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 476728,
            percent: 0.4677,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 542472,
            percent: 0.5323,
          },
        ],
      },
      {
        voivodeship: 'lublin',
        entitledVote: 1671659,
        issuedBallots: 1093077,
        correspondenceVotes: 11288,
        totalValidVotes: 1094083,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 725453,
            percent: 0.6631,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 368630,
            percent: 0.3369,
          },
        ],
      },
      {
        voivodeship: 'lubusz',
        entitledVote: 770309,
        issuedBallots: 496831,
        correspondenceVotes: 3587,
        totalValidVotes: 496438,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 199589,
            percent: 0.402,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 296849,
            percent: 0.598,
          },
        ],
      },
      {
        voivodeship: 'lodz',
        entitledVote: 1909980,
        issuedBallots: 1318570,
        correspondenceVotes: 12512,
        totalValidVotes: 1319077,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 718404,
            percent: 0.5446,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 600673,
            percent: 0.4554,
          },
        ],
      },
      {
        voivodeship: 'lesser_poland',
        entitledVote: 2662442,
        issuedBallots: 1849547,
        correspondenceVotes: 24685,
        totalValidVotes: 1856755,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 1107590,
            percent: 0.5965,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 749165,
            percent: 0.4035,
          },
        ],
      },
      {
        voivodeship: 'masovian',
        entitledVote: 4666787,
        issuedBallots: 3028789,
        correspondenceVotes: 416802,
        totalValidVotes: 3415293,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 1630346,
            percent: 0.4774,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 1784947,
            percent: 0.5226,
          },
        ],
      },
      {
        voivodeship: 'opole',
        entitledVote: 766446,
        issuedBallots: 454672,
        correspondenceVotes: 4599,
        totalValidVotes: 455330,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 215648,
            percent: 0.4736,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 239682,
            percent: 0.5264,
          },
        ],
      },
      {
        voivodeship: 'subcarpathian',
        entitledVote: 1680845,
        issuedBallots: 1104807,
        correspondenceVotes: 12800,
        totalValidVotes: 1107778,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 785645,
            percent: 0.7092,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 322133,
            percent: 0.2908,
          },
        ],
      },
      {
        voivodeship: 'podlaskie',
        entitledVote: 919765,
        issuedBallots: 586416,
        correspondenceVotes: 5259,
        totalValidVotes: 586110,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 352489,
            percent: 0.6014,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 233621,
            percent: 0.3986,
          },
        ],
      },
      {
        voivodeship: 'pomeranian',
        entitledVote: 1839064,
        issuedBallots: 1278562,
        correspondenceVotes: 9865,
        totalValidVotes: 1277279,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 512916,
            percent: 0.4016,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 764363,
            percent: 0.5984,
          },
        ],
      },
      {
        voivodeship: 'silesian',
        entitledVote: 3417778,
        issuedBallots: 2254706,
        correspondenceVotes: 32523,
        totalValidVotes: 2266127,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 1110233,
            percent: 0.4899,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 1155894,
            percent: 0.5101,
          },
        ],
      },
      {
        voivodeship: 'holy_cross',
        entitledVote: 989213,
        issuedBallots: 651001,
        correspondenceVotes: 5595,
        totalValidVotes: 651115,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 419367,
            percent: 0.6441,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 231748,
            percent: 0.3559,
          },
        ],
      },
      {
        voivodeship: 'warmian_masurian',
        entitledVote: 1128441,
        issuedBallots: 697207,
        correspondenceVotes: 4076,
        totalValidVotes: 695459,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 325723,
            percent: 0.4684,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 369736,
            percent: 0.5316,
          },
        ],
      },
      {
        voivodeship: 'greater_poland',
        entitledVote: 2681058,
        issuedBallots: 1836282,
        correspondenceVotes: 20548,
        totalValidVotes: 1840718,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 829590,
            percent: 0.4507,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 1011128,
            percent: 0.5493,
          },
        ],
      },
      {
        voivodeship: 'west_pomeranian',
        entitledVote: 1351364,
        issuedBallots: 890691,
        correspondenceVotes: 6704,
        totalValidVotes: 890209,
        candidates: [
          {
            type: 0,
            name: { forename: 'Andrzej', surname: 'Duda' },
            votes: 367096,
            percent: 0.4124,
          },
          {
            type: 1,
            name: { forename: 'Rafał', surname: 'Trzaskowski' },
            votes: 523113,
            percent: 0.5876,
          },
        ],
      },
    ];
    return { statistics };
  }
}
