export type WeightRecord = {
  date: string;
  weight: number;
};

export type ApiResponse<T = unknown> = {
  code: number;
  data: T;
};

export type SummaryData = {
  monthWeight: Array<{
    description: string;
    value: number;
  }>;
};
