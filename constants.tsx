
import React from 'react';
import { MenuKey, SubMenuKey } from './types';
import { 
    FloodsIcon, 
    VulnerableHouseIcon, 
    DonationIcon, 
    VolunteersIcon, 
    MapIcon, 
    BarChartIcon,
    UserIcon,
    ListIcon
} from './components/icons';

type MenuStructureType = {
  [key in MenuKey]: {
    label: string;
    Icon: React.FC<{ className?: string }>;
    submenus: {
      [key in SubMenuKey]?: {
        label: string;
        Icon: React.FC<{ className?: string }>;
      };
    };
  };
};

export const MENU_STRUCTURE: MenuStructureType = {
  [MenuKey.MAP]: {
    label: 'Mapa',
    Icon: MapIcon,
    submenus: {
      [SubMenuKey.FLOODS]: { label: 'Enchentes', Icon: FloodsIcon },
      [SubMenuKey.VULNERABLE_HOUSES]: { label: 'Casas Vulneráveis', Icon: VulnerableHouseIcon },
      [SubMenuKey.DONATIONS]: { label: 'Doações', Icon: DonationIcon },
      [SubMenuKey.VOLUNTEERS]: { label: 'Voluntários', Icon: VolunteersIcon },
    },
  },
  [MenuKey.OCCURRENCES]: {
    label: 'Ocorrências',
    Icon: BarChartIcon,
    submenus: {
      [SubMenuKey.MY_OCCURRENCES]: { label: 'Minhas Ocorrências', Icon: UserIcon },
      [SubMenuKey.LIST_OCCURRENCES]: { label: 'Lista de Ocorrências', Icon: ListIcon },
    },
  },
};
