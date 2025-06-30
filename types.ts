export enum ReportType {
  FLOODS = 'FLOODS',
  VULNERABLE_HOUSES = 'VULNERABLE_HOUSES',
  DONATIONS = 'DONATIONS',
  VOLUNTEERS = 'VOLUNTEERS',
  OCCURRENCES = 'OCCURRENCES',
}

export interface MapPoint {
  id: string;
  coords: [number, number];
  title: string;
  description: string;
  date: string;
}

export interface Occurrence {
  id: string;
  territory: string;
  problem: string;
  sector: string;
  status: 'Pendente' | 'Em Andamento' | 'Resolvido';
  details: string;
}
