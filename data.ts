
import { ReportType, MapPoint, Occurrence } from './types';

export const MAP_DATA: { [key in ReportType]?: MapPoint[] } = {
  [ReportType.FLOODS]: [
    { id: 'f1', coords: [-22.911, -43.23], title: 'Ponto de Alagamento na Tijuca', description: 'Acúmulo de água na Rua Conde de Bonfim, próximo à Praça Saens Peña.', date: '25/07/2024' },
    { id: 'f2', coords: [-22.95, -43.18], title: 'Enchente em Botafogo', description: 'Rua Voluntários da Pátria com bolsão d\'água intransitável.', date: '25/07/2024' },
    { id: 'f3', coords: [-22.88, -43.35], title: 'Risco de Deslizamento na Gardênia Azul', description: 'Chuvas fortes aumentam o risco na comunidade.', date: '24/07/2024' },
  ],
  [ReportType.VULNERABLE_HOUSES]: [
    { id: 'vh1', coords: [-22.90, -43.39], title: 'Casa com Risco Estrutural no Rio das Pedras', description: 'Residência em área de encosta com rachaduras visíveis.', date: '22/07/2024' },
    { id: 'vh2', coords: [-22.85, -43.29], title: 'Moradia em Área de Risco no Complexo do Alemão', description: 'Construção precária em ponto de alagamento recorrente.', date: '20/07/2024' },
  ],
  [ReportType.DONATIONS]: [
    { id: 'd1', coords: [-22.97, -43.21], title: 'Ponto de Coleta - Associação de Moradores', description: 'Recebendo alimentos não perecíveis, água e roupas. Aberto das 9h às 17h.', date: '26/07/2024' },
    { id: 'd2', coords: [-22.93, -43.20], title: 'Igreja local - Centro de Doações', description: 'Necessitando de produtos de higiene pessoal e material de limpeza.', date: '26/07/2024' },
  ],
  [ReportType.VOLUNTEERS]: [
    { id: 'v1', coords: [-22.96, -43.19], title: 'Grupo de Voluntários de Copacabana', description: 'Organizando mutirão de limpeza para o próximo fim de semana. Contato: (21) 9999-8888', date: '23/07/2024' },
    { id: 'v2', coords: [-22.91, -43.17], title: 'Base de Apoio no Aterro do Flamengo', description: 'Voluntários auxiliando na distribuição de doações e apoio logístico.', date: '25/07/2024' },
  ]
};

export const OCCURRENCES_DATA: Occurrence[] = [
  { 
    id: 'o1', 
    territory: 'Tijuca', 
    problem: 'Poste de luz com risco de queda', 
    sector: 'Iluminação Pública', 
    status: 'Pendente',
    details: 'O poste na esquina da Rua Conde de Bonfim com a Rua Uruguai está visivelmente inclinado após a tempestade de ontem. A base parece comprometida e há risco iminente de queda sobre a via. Moradores locais isolaram a área com fitas.'
  },
  { 
    id: 'o2', 
    territory: 'Botafogo', 
    problem: 'Boca de lobo entupida causando alagamento', 
    sector: 'Conservação', 
    status: 'Em Andamento',
    details: 'A boca de lobo em frente ao número 250 da Rua Voluntários da Pátria está completamente obstruída, causando um grande alagamento que impede a passagem de pedestres e afeta o trânsito. A água está começando a invadir as lojas próximas.'
  },
  { 
    id: 'o3', 
    territory: 'Complexo do Alemão', 
    problem: 'Coleta de lixo irregular', 
    sector: 'Limpeza Urbana', 
    status: 'Pendente',
    details: 'A coleta de lixo na viela principal não ocorre há mais de uma semana. O acúmulo de detritos está atraindo vetores e causando mau cheiro, representando um risco à saúde pública dos moradores.'
  },
  { 
    id: 'o4', 
    territory: 'Copacabana', 
    problem: 'Sinal de trânsito quebrado', 
    sector: 'Engenharia de Tráfego', 
    status: 'Resolvido',
    details: 'O semáforo no cruzamento da Avenida Atlântica com a Rua Figueiredo de Magalhães estava com a luz vermelha queimada, causando confusão e risco de acidentes. A equipe de manutenção já realizou o reparo no dia 26/07.'
  },
  { 
    id: 'o5', 
    territory: 'Gardênia Azul', 
    problem: 'Falta de água recorrente', 
    sector: 'Saneamento Básico', 
    status: 'Em Andamento',
    details: 'Moradores da região oeste da Gardênia Azul relatam interrupção no fornecimento de água por mais de 48 horas. É um problema crônico que se agrava em períodos de calor. Equipes da concessionária foram acionadas.'
  },
  { 
    id: 'o6', 
    territory: 'Rio das Pedras', 
    problem: 'Descarte irregular de entulho em via pública', 
    sector: 'Limpeza Urbana', 
    status: 'Pendente',
    details: 'Grande quantidade de entulho de construção civil foi descartada em um terreno baldio na entrada da comunidade, bloqueando parte da calçada e forçando pedestres a andar pela rua.'
  },
  { 
    id: 'o7', 
    territory: 'Aterro do Flamengo', 
    problem: 'Iluminação pública deficiente em área de lazer', 
    sector: 'Iluminação Pública', 
    status: 'Resolvido',
    details: 'Vários postes de luz na área do parquinho infantil estavam apagados, deixando o local perigoso durante a noite. A manutenção foi concluída e a iluminação restabelecida.'
  }
];
