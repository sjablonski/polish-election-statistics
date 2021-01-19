import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { DescriptiveStatistics } from "../utils/DescriptiveStatistics";
import { ArrayUtils } from "../utils/array-utils";
import { VoivodeshipPipe } from "../pipes/voivodeship.pipe";
import { Statistics } from "../interfaces/statistics";

@Injectable({
  providedIn: "root",
})
export class StatisticsService {
  private readonly statisticsUrl = "api/statistics";

  constructor(
    private http: HttpClient,
    private voivodeshipPipe: VoivodeshipPipe
  ) {}

  getStatistics() {
    return this.http
      .get<Statistics[]>(this.statisticsUrl)
      .pipe(catchError(this.handleError<Statistics[]>([])));
  }

  getStatistic(voivodeshipId: string) {
    return this.http
      .get<Statistics[]>(this.statisticsUrl + "?voivodeship=" + voivodeshipId)
      .pipe(catchError(this.handleError<Statistics[]>([])));
  }

  getDescriptiveStatistics() {
    return this.getStatistics().pipe(
      map((statistics) => this.fillDescriptiveStatistics(statistics)),
      catchError(this.handleError<Statistics[]>([]))
    );
  }

  getChernoffData() {
    return this.getStatistics().pipe(
      map((statistics) => {
        const describeStats = this.fillDescriptiveStatistics(statistics);
        return this.fillChernoffData(statistics, describeStats);
      }),
      catchError(this.handleError<Statistics[]>([]))
    );
  }

  getChernoffDataById(voivodeshipId: string) {
    return this.getChernoffData().pipe(
      map((data) =>
        data.find((el: Statistics) => el.voivodeship === voivodeshipId)
      ),
      catchError(this.handleError<Statistics[]>([]))
    );
  }

  fillDescriptiveStatistics(statistics: Statistics[]) {
    const mergedStats = ArrayUtils.concatToObject(statistics);
    mergedStats.candidates = ArrayUtils.concatToObject(mergedStats.candidates);
    mergedStats.candidates = Object.values(mergedStats.candidates).map(
      (candidate: any) => {
        const result = ArrayUtils.concatToObject(candidate);
        result.type = result.type[0];
        result.name = result.name[0];
        return result;
      }
    );
    const describeStats = this.generateDescriptiveStatistics(mergedStats);
    const { candidates, ...otherDescribeStats } = this.keySwap(describeStats);

    candidates.forEach((el: { [key: string]: any }) => {
      Object.entries(otherDescribeStats).forEach(([k, v]) => {
        (v.candidates = v.candidates || []).push(el[k]);
      });
    });

    return otherDescribeStats;
  }

  fillChernoffData(stats: Statistics[], describeStats: any) {
    const normalizeArr: { [key: string]: any } = {
      correspondenceVotes: { shape: "brow", value: [-1, 1] },
      entitledVote: { shape: "face", value: [0, 1] },
      issuedBallots: { shape: "hair", value: [-1, 1] },
      totalValidVotes: { shape: "mouth", value: [-1, 1] },
      percent_0: { shape: "noseh", value: [0, 1] },
      percent_1: { shape: "nosew", value: [0, 1] },
      votes_0: { shape: "eyeh", value: [0, 1] },
      votes_1: { shape: "eyew", value: [0, 1] },
      type_0: { shape: "type_0", value: [0, 0] }, // unused
      type_1: { shape: "type_1", value: [0, 0] }, // unused
    };

    let { min, max } = describeStats;
    min = { ...min, ...ArrayUtils.flattenObject(min.candidates) };
    max = { ...max, ...ArrayUtils.flattenObject(max.candidates) };

    const normalize = stats
      .map((statistic) => ({
        ...statistic,
        ...ArrayUtils.flattenObject(statistic.candidates),
      }))
      .reduce((prev: any, curr) => {
        return [
          ...prev,
          Object.entries(curr).reduce(
            (prev2: { [key: string]: any }, [k, v]) => {
              if (typeof v === "number") {
                const index = normalizeArr[k].shape;
                prev2[index] = DescriptiveStatistics.normalize(
                  min[k],
                  max[k],
                  v,
                  normalizeArr[k].value
                );
              } else if (k === "voivodeship" && typeof v === "string") {
                prev2["label"] = this.voivodeshipPipe.transform(v);
                prev2[k] = v;
              } else {
                prev2[k] = v;
              }
              return prev2;
            },
            {}
          ),
        ];
      }, []);
    return normalize;
  }

  keySwap<T>(obj: T) {
    return Object.entries(obj).reduce(
      (prev: { [key: string]: any }, [k, v]) => {
        Object.entries(v).forEach(([subK, subV]) => {
          if (Array.isArray(v)) {
            prev[k] = v.reduce(
              (prevArr, curr) => [...prevArr, this.keySwap(curr)],
              []
            );
          } else {
            prev[subK] = { ...prev[subK], [k]: subV };
          }
        });
        return prev;
      },
      {}
    );
  }

  generateDescriptiveStatistics<T>(obj: T) {
    return Object.entries(obj).reduce(
      (prev: { [key: string]: any }, [k, v]) => {
        if (Array.isArray(v)) {
          if (v.every((el) => typeof el === "number")) {
            prev[k] = DescriptiveStatistics.getAll(v);
          } else if (v.every((el) => el === Object(el))) {
            prev[k] = v.map((value) => ({
              ...value,
              ...this.generateDescriptiveStatistics(value),
            }));
          }
        }
        return prev;
      },
      {}
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
