export interface Statistics {
  voivodeship: string;
  entitledVote: number;
  issuedBallots: number;
  correspondenceVotes: number;
  totalValidVotes: number;
  candidates: Candidates[];
}

export interface Candidates {
  type: number;
  name: {
    forename: string;
    surname: string;
  };
  votes: number;
  percent: number;
}
