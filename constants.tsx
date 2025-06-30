
import React from 'react';
import { ReportType } from './types';
import { FloodsIcon, VulnerableHouseIcon, DonationIcon, VolunteersIcon, AlertTriangleIcon } from './components/icons';

export const REPORT_ICONS: { [key in ReportType]: { Icon: React.FC<{className?: string}>, label: string, name: string } } = {
  [ReportType.FLOODS]: { Icon: FloodsIcon, label: 'Enchente', name: 'ENCHENTES' },
  [ReportType.VULNERABLE_HOUSES]: { Icon: VulnerableHouseIcon, label: 'Casa Vulnerável', name: 'CASAS VULNERÁVEIS'},
  [ReportType.DONATIONS]: { Icon: DonationIcon, label: 'Doação', name: 'DOAÇÕES' },
  [ReportType.VOLUNTEERS]: { Icon: VolunteersIcon, label: 'Voluntário', name: 'VOLUNTÁRIOS' },
  [ReportType.OCCURRENCES]: { Icon: AlertTriangleIcon, label: 'Ocorrência', name: 'OCORRÊNCIAS' },
};
