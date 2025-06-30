
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

export interface Occurrence {
  id: string;
  territory: string;
  problem: string;
  sector: string;
  status: 'Pendente' | 'Em Andamento' | 'Resolvido';
  details: string;
  assigneeId?: string;
}
