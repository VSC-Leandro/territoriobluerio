export enum MenuKey {
  MAP = 'MAP',
  OCCURRENCES = 'OCCURRENCES',
}

export enum SubMenuKey {
  // Map Submenus
  FLOODS = 'FLOODS',
  VULNERABLE_HOUSES = 'VULNERABLE_HOUSES',
  DONATIONS = 'DONATIONS',
  VOLUNTEERS = 'VOLUNTEERS',
  // Occurrences Submenus
  MY_OCCURRENCES = 'MY_OCCURRENCES',
  LIST_OCCURRENCES = 'LIST_OCCURRENCES',
}

export type MapPointType = SubMenuKey.FLOODS | SubMenuKey.VULNERABLE_HOUSES | SubMenuKey.DONATIONS | SubMenuKey.VOLUNTEERS;

export interface ActiveView {
  menu: MenuKey | null;
  submenu: SubMenuKey | null;
}

export interface MapPoint {
  id: string;
  coords: [number, number];
  title: string;
  description: string;
  date: string;
}

export type Agency = 'Defesa Civil' | 'Bombeiros' | 'Policia Militar' | 'SAMU' | 'Agentes Voluntários';

export interface Occurrence {
  id: string;
  territory: string; // Neighborhood or specific area
  region: string; // New: e.g., 'Região Metropolitana'
  city: string; // New: e.g., 'Rio de Janeiro'
  problem: string;
  sector: string;
  status: 'Pendente' | 'Encaminhado' | 'A Caminho' | 'No Local' | 'Resolvido' | 'Não Resolvido';
  details: string;
  assigneeId?: string;
  assignedAgency?: Agency;
  reporter: {
    name: string;
    phone: string;
  };
  history: {
    status: string;
    date: string;
    notes?: string;
  }[];
  report?: {
    resolved: boolean;
    reason?: string;
    notes: string;
  };
}