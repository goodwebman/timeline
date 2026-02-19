export type TimelineEvent = {
  id: string;
  year: string;
  text: string;
};

export type TimelinePeriod = {
  id: string;
  title: string;
  start: number;
  end: number;
  events: TimelineEvent[];
};
