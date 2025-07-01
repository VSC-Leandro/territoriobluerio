import React, { useState, useMemo } from 'react';
import { OCCURRENCES_DATA } from '../data';
import { Occurrence } from '../types';
import { PhoneIcon, ClockIcon, SearchIcon } from './icons';

const currentUserId = 'user123';

const getStatusClasses = (status: Occurrence['status'], isLarge: boolean = false) => {
  const baseClasses = isLarge ? 'px-4 py-1.5 text-sm' : 'px-3 py-1 text-xs';
  switch (status) {
    case 'Pendente':
      return `${baseClasses} bg-brand-yellow/20 text-brand-yellow`;
    case 'Encaminhado':
    case 'A Caminho':
    case 'No Local':
      return `${baseClasses} bg-blue-500/20 text-blue-400`;
    case 'Resolvido':
      return `${baseClasses} bg-brand-green/20 text-brand-green`;
    case 'Não Resolvido':
        return `${baseClasses} bg-brand-red-light/20 text-brand-red-light`;
    default:
      return `${baseClasses} bg-gray-500/20 text-gray-400`;
  }
};

const ReportModal: React.FC<{
  occurrence: Occurrence;
  onClose: () => void;
  onSubmit: (report: Occurrence['report'], finalStatus: Occurrence['status']) => void;
}> = ({ occurrence, onClose, onSubmit }) => {
    const [finalStatus, setFinalStatus] = useState<'Resolvido' | 'Não Resolvido'>('Resolvido');
    const [notes, setNotes] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!notes || (finalStatus === 'Não Resolvido' && !reason)) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        const report = {
            resolved: finalStatus === 'Resolvido',
            notes,
            ...(finalStatus === 'Não Resolvido' && { reason })
        };
        onSubmit(report, finalStatus);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[3000] p-4" onClick={onClose}>
            <div
                className="relative bg-brand-dark border-2 border-brand-green/50 p-8 rounded-lg shadow-2xl w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-brand-green mb-4">Relatório de Finalização</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="font-semibold text-brand-light block mb-2">Status da Resolução *</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-brand-light">
                                <input type="radio" name="status" value="Resolvido" checked={finalStatus === 'Resolvido'} onChange={() => setFinalStatus('Resolvido')} className="accent-brand-green"/>
                                Resolvido
                            </label>
                            <label className="flex items-center gap-2 text-brand-light">
                                <input type="radio" name="status" value="Não Resolvido" checked={finalStatus === 'Não Resolvido'} onChange={() => setFinalStatus('Não Resolvido')} className="accent-brand-green"/>
                                Não Resolvido
                            </label>
                        </div>
                    </div>
                    {finalStatus === 'Não Resolvido' && (
                        <div>
                            <label htmlFor="reason" className="font-semibold text-brand-light block mb-2">Motivo (se não resolvido) *</label>
                            <input
                                id="reason"
                                type="text"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full bg-brand-dark/50 border-2 border-brand-green/30 text-brand-light rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-green-dark"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="notes" className="font-semibold text-brand-light block mb-2">Relato do Atendimento *</label>
                         <textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full h-32 bg-brand-dark/50 border-2 border-brand-green/30 text-brand-light rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-green-dark"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-brand-light/20 text-brand-light font-bold py-2 px-6 rounded-md hover:bg-brand-light/30 transition-colors">Cancelar</button>
                        <button type="submit" className="bg-brand-green text-brand-dark font-bold py-2 px-6 rounded-md hover:bg-white transition-colors">Salvar Relatório</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const MyOccurrences: React.FC = () => {
  const [occurrences, setOccurrences] = useState<Occurrence[]>(OCCURRENCES_DATA);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const assignedOccurrences = useMemo(() => {
    return occurrences.filter(o => o.assigneeId === currentUserId).sort((a,b) => {
        const statusOrder = { 'Pendente': 0, 'Encaminhado': 1, 'A Caminho': 2, 'No Local': 3, 'Resolvido': 4, 'Não Resolvido': 5 };
        return statusOrder[a.status] - statusOrder[b.status];
    });
  }, [occurrences]);
  
  const filteredMyOccurrences = useMemo(() => {
    return assignedOccurrences.filter(o => {
        const matchesStatus = statusFilter === 'Todos' || o.status === statusFilter;
        const matchesSearch = searchTerm === '' ||
            o.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.territory.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });
  }, [assignedOccurrences, statusFilter, searchTerm]);

  const selectedOccurrence = useMemo(() => {
    return assignedOccurrences.find(o => o.id === selectedId);
  }, [assignedOccurrences, selectedId]);
  
  const formatDate = (date: Date) => `${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

  const handleStatusChange = () => {
    if (!selectedOccurrence) return;
    
    let nextStatus: Occurrence['status'] | null = null;
    let notes: string | undefined = undefined;

    switch (selectedOccurrence.status) {
        case 'Pendente': // This case might be obsolete if dispatch is mandatory
            nextStatus = 'A Caminho';
            notes = 'Agente iniciou deslocamento.';
            break;
        case 'Encaminhado':
            nextStatus = 'A Caminho';
            notes = 'Agente confirmou o início do deslocamento.';
            break;
        case 'A Caminho':
            nextStatus = 'No Local';
            notes = 'Agente chegou ao local.';
            break;
        case 'No Local':
            setIsReportModalOpen(true);
            return;
    }

    if (nextStatus) {
      const newHistoryEntry = { status: nextStatus, date: formatDate(new Date()), notes };
      const updatedOccurrence = { 
          ...selectedOccurrence, 
          status: nextStatus,
          history: [...selectedOccurrence.history, newHistoryEntry]
      };
      setOccurrences(prev => prev.map(o => o.id === updatedOccurrence.id ? updatedOccurrence : o));
    }
  };

  const handleReportSubmit = (report: Occurrence['report'], finalStatus: Occurrence['status']) => {
      if (!selectedOccurrence) return;

      const newHistoryEntry = { status: finalStatus, date: formatDate(new Date()), notes: report?.notes };
      const updatedOccurrence = {
          ...selectedOccurrence,
          status: finalStatus,
          report,
          history: [...selectedOccurrence.history, newHistoryEntry]
      };
      setOccurrences(prev => prev.map(o => o.id === updatedOccurrence.id ? updatedOccurrence : o));
      setIsReportModalOpen(false);
      setSelectedId(null);
  }

  const getStatusButtonInfo = (status: Occurrence['status']) => {
    switch (status) {
      case 'Pendente':
        return { text: 'Iniciar Atendimento', disabled: false };
       case 'Encaminhado':
        return { text: 'Iniciar Deslocamento', disabled: false };
      case 'A Caminho':
        return { text: 'Cheguei ao Local', disabled: false };
      case 'No Local':
        return { text: 'Finalizar Atendimento', disabled: false };
      case 'Resolvido':
      case 'Não Resolvido':
        return { text: 'Ocorrência Finalizada', disabled: true };
      default:
        return { text: '', disabled: true };
    }
  };

  if (selectedOccurrence) {
    const statusButton = getStatusButtonInfo(selectedOccurrence.status);
    return (
        <>
        <div className="flex-1 bg-brand-dark p-4 md:p-8 space-y-6">
            <button onClick={() => setSelectedId(null)} className="text-brand-green font-semibold hover:underline">
                &larr; Voltar para a lista
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-brand-dark/50 p-6 rounded-lg border border-brand-green/20">
                        <h2 className="text-2xl font-bold text-brand-green mb-2">{selectedOccurrence.problem}</h2>
                        <div className="flex items-center gap-4 mb-4 flex-wrap">
                            <span className={`${getStatusClasses(selectedOccurrence.status, true)} font-bold rounded-full`}>
                                {selectedOccurrence.status}
                            </span>
                            <span className="text-brand-light/80 font-semibold">{selectedOccurrence.sector}</span>
                             {selectedOccurrence.assignedAgency && (
                                <span className="text-brand-light/80 font-semibold border-l-2 border-brand-green/30 pl-4">
                                    Agência: <span className="text-brand-light font-bold">{selectedOccurrence.assignedAgency}</span>
                                </span>
                            )}
                        </div>
                        <p className="text-brand-light/80"><span className="font-bold text-brand-light">Território:</span> {selectedOccurrence.territory}</p>
                        <h3 className="text-lg font-bold text-brand-light mt-4 mb-2">Descrição Detalhada</h3>
                        <p className="text-brand-light/90 whitespace-pre-wrap">{selectedOccurrence.details}</p>
                    </div>
                     <div className="w-full">
                        <button
                            onClick={handleStatusChange}
                            disabled={statusButton.disabled}
                            className="w-full bg-brand-green text-brand-dark font-bold py-4 px-6 rounded-md hover:bg-white transition-colors text-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {statusButton.text}
                        </button>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-brand-dark/50 p-6 rounded-lg border border-brand-green/20">
                         <h3 className="text-lg font-bold text-white mb-3">Informações do Solicitante</h3>
                         <div className="space-y-2">
                             <p className="text-brand-light/80"><span className="font-semibold text-brand-light">Nome:</span> {selectedOccurrence.reporter.name}</p>
                             <p className="text-brand-light/80"><span className="font-semibold text-brand-light">Telefone:</span> {selectedOccurrence.reporter.phone}</p>
                         </div>
                         <a 
                            href={`tel:${selectedOccurrence.reporter.phone}`}
                            className="w-full mt-4 inline-flex items-center justify-center bg-brand-dark/50 border-2 border-brand-green text-brand-green font-bold py-2 px-4 rounded-md hover:bg-brand-green hover:text-brand-dark transition-colors"
                        >
                            <PhoneIcon className="w-5 h-5 mr-2" />
                            Ligar para o Solicitante
                        </a>
                    </div>
                    <div className="bg-brand-dark/50 p-6 rounded-lg border border-brand-green/20">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <ClockIcon className="w-5 h-5" />
                            Linha do Tempo
                        </h3>
                         <div className="relative pl-5 max-h-60 overflow-y-auto">
                            <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-brand-green/30"></div>
                             {selectedOccurrence.history.map((item, index) => (
                                <div key={index} className="mb-4 relative">
                                    <div className="absolute -left-[5px] top-1 w-4 h-4 bg-brand-green rounded-full border-4 border-brand-dark"></div>
                                    <p className="font-semibold text-brand-light">{item.status}</p>
                                    <p className="text-xs text-brand-light/60">{item.date}</p>
                                    {item.notes && <p className="text-sm text-brand-light/80 mt-1 italic">"{item.notes}"</p>}
                                </div>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {isReportModalOpen && <ReportModal occurrence={selectedOccurrence} onClose={() => setIsReportModalOpen(false)} onSubmit={handleReportSubmit} />}
        </>
    );
  }

  return (
    <div className="flex-1 bg-brand-dark p-4 md:p-8">
      <h2 className="text-3xl font-bold text-brand-light mb-6">Minhas Ocorrências</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-green/70" />
                <input
                    type="text"
                    placeholder="Buscar por território ou problema..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full bg-brand-dark/50 border-2 border-brand-green/30 text-brand-light placeholder-brand-light/70 rounded-md py-2 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-green-dark"
                />
            </div>
            <select 
                value={statusFilter} 
                onChange={e => setStatusFilter(e.target.value)} 
                className="bg-brand-dark/50 border-2 border-brand-green/30 text-brand-light rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-green-dark transition-colors w-full md:w-auto"
            >
                <option value="Todos">Todos os Status</option>
                <option value="Pendente">Pendente</option>
                <option value="Encaminhado">Encaminhado</option>
                <option value="A Caminho">A Caminho</option>
                <option value="No Local">No Local</option>
                <option value="Resolvido">Resolvido</option>
                <option value="Não Resolvido">Não Resolvido</option>
            </select>
        </div>

      {filteredMyOccurrences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMyOccurrences.map((occurrence) => (
            <div 
              key={occurrence.id} 
              className="bg-brand-dark/50 rounded-lg p-6 border border-brand-green/20 hover:border-brand-green/50 transition-all cursor-pointer flex flex-col justify-between"
              onClick={() => setSelectedId(occurrence.id)}
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-white pr-4">{occurrence.problem}</h3>
                  <span className={`${getStatusClasses(occurrence.status)} font-bold rounded-full`}>
                    {occurrence.status}
                  </span>
                </div>
                <p className="text-sm text-brand-light/70">{occurrence.territory} &bull; {occurrence.sector}</p>
              </div>
              <p className="text-sm text-brand-light/90 mt-4 line-clamp-3">{occurrence.details}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center p-8 text-brand-light/70">Nenhuma ocorrência encontrada para os filtros selecionados.</p>
      )}
    </div>
  );
};

export default MyOccurrences;