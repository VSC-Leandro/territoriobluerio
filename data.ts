import { SubMenuKey, MapPoint, Occurrence, MapPointType } from './types';

export const MAP_DATA: { [key in MapPointType]?: MapPoint[] } = {
  [SubMenuKey.FLOODS]: [
    { id: 'f1', coords: [-22.911, -43.23], title: 'Ponto de Alagamento na Tijuca', description: 'Acúmulo de água na Rua Conde de Bonfim, próximo à Praça Saens Peña.', date: '25/07/2024' },
    { id: 'f2', coords: [-22.95, -43.18], title: 'Enchente em Botafogo', description: 'Rua Voluntários da Pátria com bolsão d\'água intransitável.', date: '25/07/2024' },
    { id: 'f3', coords: [-22.88, -43.35], title: 'Risco de Deslizamento na Gardênia Azul', description: 'Chuvas fortes aumentam o risco na comunidade.', date: '24/07/2024' },
  ],
  [SubMenuKey.VULNERABLE_HOUSES]: [
    { id: 'vh1', coords: [-22.90, -43.39], title: 'Casa com Risco Estrutural no Rio das Pedras', description: 'Residência em área de encosta com rachaduras visíveis.', date: '22/07/2024' },
    { id: 'vh2', coords: [-22.85, -43.29], title: 'Moradia em Área de Risco no Complexo do Alemão', description: 'Construção precária em ponto de alagamento recorrente.', date: '20/07/2024' },
  ],
  [SubMenuKey.DONATIONS]: [
    { id: 'd1', coords: [-22.97, -43.21], title: 'Ponto de Coleta - Associação de Moradores', description: 'Recebendo alimentos não perecíveis, água e roupas. Aberto das 9h às 17h.', date: '26/07/2024' },
    { id: 'd2', coords: [-22.93, -43.20], title: 'Igreja local - Centro de Doações', description: 'Necessitando de produtos de higiene pessoal e material de limpeza.', date: '26/07/2024' },
  ],
  [SubMenuKey.VOLUNTEERS]: [
    { id: 'v1', coords: [-22.96, -43.19], title: 'Grupo de Voluntários de Copacabana', description: 'Organizando mutirão de limpeza para o próximo fim de semana. Contato: (21) 9999-8888', date: '23/07/2024' },
    { id: 'v2', coords: [-22.91, -43.17], title: 'Base de Apoio no Aterro do Flamengo', description: 'Voluntários auxiliando na distribuição de doações e apoio logístico.', date: '25/07/2024' },
  ]
};

const currentUser = 'user123';

const now = new Date();
const formatDate = (date: Date) => `${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

export const OCCURRENCES_DATA: Occurrence[] = [
  { 
    id: 'o1', 
    territory: 'Tijuca', 
    region: 'Região Metropolitana',
    city: 'Rio de Janeiro',
    problem: 'Poste de luz com risco de queda', 
    sector: 'Iluminação Pública', 
    status: 'Pendente',
    details: 'O poste na esquina da Rua Conde de Bonfim com a Rua Uruguai está visivelmente inclinado após a tempestade de ontem. A base parece comprometida e há risco iminente de queda sobre a via. Moradores locais isolaram a área com fitas.',
    assigneeId: currentUser,
    reporter: { name: 'Ana Pereira', phone: '(21) 98877-6655' },
    history: [
      { status: 'Criado', date: formatDate(new Date(now.getTime() - 2 * 60 * 60 * 1000)) }
    ]
  },
  { 
    id: 'o2', 
    territory: 'Botafogo', 
    region: 'Região Metropolitana',
    city: 'Rio de Janeiro',
    problem: 'Boca de lobo entupida causando alagamento', 
    sector: 'Conservação', 
    status: 'A Caminho',
    details: 'A boca de lobo em frente ao número 250 da Rua Voluntários da Pátria está completamente obstruída, causando um grande alagamento que impede a passagem de pedestres e afeta o trânsito. A água está começando a invadir as lojas próximas.',
    assigneeId: currentUser,
    reporter: { name: 'Bruno Costa', phone: '(21) 99988-7766' },
    history: [
      { status: 'Criado', date: formatDate(new Date(now.getTime() - 4 * 60 * 60 * 1000)) },
      { status: 'A Caminho', date: formatDate(new Date(now.getTime() - 15 * 60 * 1000)), notes: 'Agente iniciado deslocamento.' }
    ]
  },
  { 
    id: 'o3', 
    territory: 'Complexo do Alemão', 
    region: 'Região Metropolitana',
    city: 'Rio de Janeiro',
    problem: 'Coleta de lixo irregular', 
    sector: 'Limpeza Urbana', 
    status: 'Pendente',
    details: 'A coleta de lixo na viela principal não ocorre há mais de uma semana. O acúmulo de detritos está atraindo vetores e causando mau cheiro, representando um risco à saúde pública dos moradores.',
    reporter: { name: 'Carla Dias', phone: '(21) 97766-5544' },
    history: [
      { status: 'Criado', date: formatDate(new Date(now.getTime() - 24 * 60 * 60 * 1000)) }
    ]
  },
  { 
    id: 'o4', 
    territory: 'Copacabana', 
    region: 'Região Metropolitana',
    city: 'Rio de Janeiro',
    problem: 'Sinal de trânsito quebrado', 
    sector: 'Engenharia de Tráfego', 
    status: 'Resolvido',
    details: 'O semáforo no cruzamento da Avenida Atlântica com a Rua Figueiredo de Magalhães estava com a luz vermelha queimada, causando confusão e risco de acidentes. A equipe de manutenção já realizou o reparo no dia 26/07.',
    assigneeId: 'user456',
    reporter: { name: 'Daniel Alves', phone: '(21) 96655-4433' },
    history: [
       { status: 'Criado', date: '26/07/2024 10:00' },
       { status: 'A Caminho', date: '26/07/2024 10:15' },
       { status: 'No Local', date: '26/07/2024 10:45' },
       { status: 'Resolvido', date: '26/07/2024 11:30', notes: 'Lâmpada do sinal vermelho substituída. Sistema operando normalmente.' },
    ],
    report: {
      resolved: true,
      notes: 'Lâmpada do sinal vermelho substituída. Sistema operando normalmente.'
    }
  },
  { 
    id: 'o5', 
    territory: 'Gardênia Azul', 
    region: 'Região Metropolitana',
    city: 'Rio de Janeiro',
    problem: 'Falta de água recorrente', 
    sector: 'Saneamento Básico', 
    status: 'No Local',
    details: 'Moradores da região oeste da Gardênia Azul relatam interrupção no fornecimento de água por mais de 48 horas. É um problema crônico que se agrava em períodos de calor. Equipes da concessionária foram acionadas e estão trabalhando no local.',
    assigneeId: currentUser,
    reporter: { name: 'Eduarda Lima', phone: '(21) 95544-3322' },
    history: [
      { status: 'Criado', date: formatDate(new Date(now.getTime() - 3 * 60 * 60 * 1000)) },
      { status: 'A Caminho', date: formatDate(new Date(now.getTime() - 2 * 60 * 60 * 1000)) },
      { status: 'No Local', date: formatDate(new Date(now.getTime() - 1 * 60 * 60 * 1000)), notes: 'Agente no local, iniciando análise da rede.' }
    ]
  },
  { 
    id: 'o6', 
    territory: 'Rio das Pedras', 
    region: 'Região Metropolitana',
    city: 'Rio de Janeiro',
    problem: 'Descarte irregular de entulho em via pública', 
    sector: 'Limpeza Urbana', 
    status: 'Não Resolvido',
    details: 'Grande quantidade de entulho de construção civil foi descartada em um terreno baldio na entrada da comunidade, bloqueando parte da calçada e forçando pedestres a andar pela rua.',
    assigneeId: currentUser,
    reporter: { name: 'Fábio Martins', phone: '(21) 94433-2211' },
    history: [
      { status: 'Criado', date: '27/07/2024 09:00' },
      { status: 'A Caminho', date: '27/07/2024 09:30' },
      { status: 'No Local', date: '27/07/2024 10:00' },
      { status: 'Não Resolvido', date: '27/07/2024 10:45', notes: 'Volume de entulho muito grande, necessita de retroescavadeira. Será agendado com equipe de obras.' }
    ],
    report: {
        resolved: false,
        reason: 'Necessita de equipamento pesado',
        notes: 'Volume de entulho muito grande, necessita de retroescavadeira. Será agendado com equipe de obras.'
    }
  },
  { 
    id: 'o7', 
    territory: 'Aterro do Flamengo', 
    region: 'Região Metropolitana',
    city: 'Rio de Janeiro',
    problem: 'Iluminação pública deficiente em área de lazer', 
    sector: 'Iluminação Pública', 
    status: 'Resolvido',
    details: 'Vários postes de luz na área do parquinho infantil estavam apagados, deixando o local perigoso durante a noite. A manutenção foi concluída e a iluminação restabelecida.',
    reporter: { name: 'Gabriela Neves', phone: '(21) 93322-1100' },
    history: [
      { status: 'Criado', date: '25/07/2024 19:00' },
      { status: 'Resolvido', date: '25/07/2024 21:00', notes: 'Troca de reatores realizada pela equipe noturna.' }
    ],
    report: {
        resolved: true,
        notes: 'Troca de reatores realizada pela equipe noturna.'
    }
  },
  { 
    id: 'o8', 
    region: 'Região Metropolitana',
    city: 'Niterói',
    territory: 'Icaraí', 
    problem: 'Afundamento de via', 
    sector: 'Conservação', 
    status: 'Pendente',
    details: 'Grande buraco na Rua Álvares de Azevedo, próximo à praia.',
    reporter: { name: 'Helena Souza', phone: '(21) 92211-0099' },
    history: [
      { status: 'Criado', date: formatDate(new Date(now.getTime() - 5 * 60 * 60 * 1000)) }
    ]
  },
  { 
    id: 'o9', 
    region: 'Região Metropolitana',
    city: 'Duque de Caxias',
    territory: 'Centro', 
    problem: 'Vazamento de água limpa', 
    sector: 'Saneamento Básico', 
    status: 'Pendente',
    assigneeId: 'user456',
    details: 'Vazamento na calçada da Av. Presidente Vargas, desperdiçando muita água.',
    reporter: { name: 'Igor Martins', phone: '(21) 91122-3344' },
    history: [
      { status: 'Criado', date: formatDate(new Date(now.getTime() - 10 * 60 * 60 * 1000)) }
    ]
  },
  { 
    id: 'o10', 
    region: 'Região Serrana',
    city: 'Petrópolis',
    territory: 'Quitandinha', 
    problem: 'Risco de deslizamento de barreira', 
    sector: 'Defesa Civil', 
    status: 'Pendente',
    assigneeId: currentUser,
    details: 'Encosta com sinais de movimentação de terra após chuvas. Moradores preocupados.',
    reporter: { name: 'Juliana Costa', phone: '(24) 98877-1122' },
    history: [
      { status: 'Criado', date: formatDate(new Date(now.getTime() - 48 * 60 * 60 * 1000)) }
    ]
  },
  {
    id: 'o11',
    region: 'Região Norte Fluminense',
    city: 'Macaé',
    territory: 'Praia Campista',
    problem: 'Erosão da orla',
    sector: 'Meio Ambiente',
    status: 'Pendente',
    details: 'Avanço do mar está erodindo a faixa de areia e ameaçando quiosques na orla da Praia Campista. Necessária avaliação de contenção.',
    reporter: { name: 'Lucas Faria', phone: '(22) 99876-5432' },
    history: [
      { status: 'Criado', date: formatDate(new Date(now.getTime() - 36 * 60 * 60 * 1000)) }
    ]
  },
  {
    id: 'o12',
    region: 'Região das Baixadas Litorâneas',
    city: 'Cabo Frio',
    territory: 'Passagem',
    problem: 'Fiação exposta em poste',
    sector: 'Iluminação Pública',
    status: 'A Caminho',
    assigneeId: 'user456',
    details: 'Poste com fiação elétrica exposta e faíscando próximo ao canal, risco de acidente para pedestres e barcos.',
    reporter: { name: 'Mariana Oliveira', phone: '(22) 98765-4321' },
    history: [
      { status: 'Criado', date: formatDate(new Date(now.getTime() - 2 * 60 * 60 * 1000)) },
      { status: 'A Caminho', date: formatDate(new Date(now.getTime() - 5 * 60 * 1000)), notes: 'Equipe de emergência a caminho.' }
    ]
  },
  {
    id: 'o13',
    region: 'Região da Costa Verde',
    city: 'Angra dos Reis',
    territory: 'Ilha Grande',
    problem: 'Trilha bloqueada por queda de árvore',
    sector: 'Defesa Civil',
    status: 'Resolvido',
    details: 'Queda de árvore de grande porte bloqueou a trilha que liga a Vila do Abraão à praia de Lopes Mendes. Equipe da Defesa Civil removeu a árvore.',
    reporter: { name: 'Pedro Santos', phone: '(24) 97654-3210' },
    history: [
      { status: 'Criado', date: '28/07/2024 08:00' },
      { status: 'No Local', date: '28/07/2024 10:00' },
      { status: 'Resolvido', date: '28/07/2024 14:00', notes: 'Árvore cortada e removida, trilha liberada.' }
    ],
    report: {
        resolved: true,
        notes: 'Árvore cortada e removida, trilha liberada com segurança.'
    }
  },
  {
    id: 'o14',
    region: 'Região do Médio Paraíba',
    city: 'Volta Redonda',
    territory: 'Aterrado',
    problem: 'Buraco perigoso na ciclovia',
    sector: 'Conservação',
    status: 'No Local',
    assigneeId: 'user123',
    details: 'Um grande buraco se abriu na ciclovia da Av. Beira-Rio, representando um risco sério para os ciclistas. A área foi sinalizada, aguardando reparo.',
    reporter: { name: 'Renata Gomes', phone: '(24) 96543-2109' },
    history: [
        { status: 'Criado', date: formatDate(new Date(now.getTime() - 6 * 60 * 60 * 1000)) },
        { status: 'A Caminho', date: formatDate(new Date(now.getTime() - 5 * 60 * 60 * 1000)) },
        { status: 'No Local', date: formatDate(new Date(now.getTime() - 4 * 60 * 60 * 1000)), notes: 'Área isolada com cones. Equipe de reparo acionada.' }
    ]
  },
  {
    id: 'o15',
    region: 'Região Serrana',
    city: 'Teresópolis',
    territory: 'Várzea',
    problem: 'Pessoas ilhadas por inundação',
    sector: 'Defesa Civil',
    status: 'Encaminhado',
    details: 'Uma família está ilhada no segundo andar de sua casa devido à subida rápida do rio. Necessitam de resgate imediato.',
    assigneeId: 'user123',
    assignedAgency: 'Bombeiros',
    reporter: { name: 'Simone Andrade', phone: '(21) 95432-1098' },
    history: [
      { status: 'Criado', date: formatDate(new Date(now.getTime() - 2 * 60 * 60 * 1000)) },
      { status: 'Encaminhado', date: formatDate(new Date(now.getTime() - 1 * 60 * 60 * 1000)), notes: 'Encaminhado para equipe de resgate dos Bombeiros.' }
    ]
  }
];