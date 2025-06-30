
import React, { useState, useMemo } from 'react';
import { OCCURRENCES_DATA } from '../data';
import { Occurrence } from '../types';
import { SearchIcon } from './icons';

const getStatusClasses = (status: Occurrence['status']) => {
  switch (status) {
    case 'Pendente':
      return 'bg-brand-yellow/20 text-brand-yellow';
    case 'Em Andamento':
      return 'bg-blue-500/20 text-blue-400';
    case 'Resolvido':
      return 'bg-brand-green/20 text-brand-green';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

const OccurrenceModal: React.FC<{
    occurrence: Occurrence | null;
    onClose: () => void;
    onUpdate: (occurrence: Occurrence) => void;
}> = ({ occurrence, onClose, onUpdate }) => {
    if (!occurrence) return null;

    const handleAttend = () => {
        onUpdate({ ...occurrence, status: 'Em Andamento' });
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[2000] p-4" onClick={onClose}>
            <div
                className="relative bg-brand-dark border-2 border-brand-green/50 p-8 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-brand-light hover:text-brand-green z-10">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <div>
                    <h2 className="text-3xl font-bold text-brand-green mb-2">{occurrence.problem}</h2>
                    <div className="flex items-center gap-4 mb-4 flex-wrap">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusClasses(occurrence.status)}`}>
                            {occurrence.status}
                        </span>
                        <span className="text-brand-light/80 font-semibold">{occurrence.sector}</span>
                    </div>
                    <p className="text-brand-light/80 mb-1"><span className="font-bold text-brand-light">Território:</span> {occurrence.territory}</p>

                    <h3 className="text-xl font-bold text-brand-light mt-6 mb-2">Descrição Detalhada</h3>
                    <p className="text-brand-light/90 whitespace-pre-wrap">{occurrence.details}</p>
                    
                    {occurrence.status === 'Pendente' && (
                        <div className="mt-8 pt-6 border-t border-brand-green/20">
                            <button
                                onClick={handleAttend}
                                className="w-full bg-brand-green text-brand-dark font-bold py-3 px-6 rounded-md hover:bg-white transition-colors text-lg"
                            >
                                ATENDER OCORRÊNCIA
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


const OccurrencesList: React.FC<{ title: string; assigneeId?: string; }> = ({ title, assigneeId }) => {
  const [occurrences, setOccurrences] = useState<Occurrence[]>(OCCURRENCES_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [sectorFilter, setSectorFilter] = useState('Todos');
  const [selectedOccurrence, setSelectedOccurrence] = useState<Occurrence | null>(null);

  const uniqueSectors = useMemo(() => {
    const sectors = new Set(occurrences.map(o => o.sector));
    return ['Todos', ...Array.from(sectors)];
  }, [occurrences]);

  const filteredOccurrences = useMemo(() => {
    return occurrences.filter(o => {
        const matchesAssignee = !assigneeId || o.assigneeId === assigneeId;

        const matchesSearch = searchTerm === '' || 
            o.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.territory.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'Todos' || o.status === statusFilter;
        const matchesSector = sectorFilter === 'Todos' || o.sector === sectorFilter;
        
        return matchesAssignee && matchesSearch && matchesStatus && matchesSector;
    });
  }, [occurrences, searchTerm, statusFilter, sectorFilter, assigneeId]);

  const handleUpdateOccurrence = (updatedOccurrence: Occurrence) => {
      setOccurrences(prev => prev.map(o => o.id === updatedOccurrence.id ? updatedOccurrence : o));
      setSelectedOccurrence(updatedOccurrence);
  };

  const selectStyles = "bg-brand-dark/50 border-2 border-brand-green/30 text-brand-light rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-green-dark transition-colors";

  return (
    <>
      <div className="flex-1 bg-brand-dark p-8">
        <h2 className="text-3xl font-bold text-brand-light mb-6">{title}</h2>
        
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
            <div className="flex gap-4">
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className={selectStyles}>
                    <option value="Todos">Todos os Status</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Resolvido">Resolvido</option>
                </select>
                <select value={sectorFilter} onChange={e => setSectorFilter(e.target.value)} className={selectStyles}>
                    {uniqueSectors.map(sector => (
                        <option key={sector} value={sector}>{sector === 'Todos' ? 'Todos os Setores' : sector}</option>
                    ))}
                </select>
            </div>
        </div>

        <div className="bg-brand-dark/50 rounded-lg overflow-hidden border border-brand-green/20">
          <table className="w-full text-left">
            <thead className="bg-brand-green/10">
              <tr>
                <th className="p-4 text-sm font-semibold text-brand-green uppercase tracking-wider">Território</th>
                <th className="p-4 text-sm font-semibold text-brand-green uppercase tracking-wider">Problema</th>
                <th className="p-4 text-sm font-semibold text-brand-green uppercase tracking-wider">Setor Responsável</th>
                <th className="p-4 text-sm font-semibold text-brand-green uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOccurrences.length > 0 ? filteredOccurrences.map((occurrence) => (
                <tr key={occurrence.id} className="border-t border-brand-green/10 hover:bg-brand-green/5 transition-colors cursor-pointer" onClick={() => setSelectedOccurrence(occurrence)}>
                  <td className="p-4 text-brand-light font-medium">{occurrence.territory}</td>
                  <td className="p-4 text-brand-light">{occurrence.problem}</td>
                  <td className="p-4 text-brand-light">{occurrence.sector}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusClasses(occurrence.status)}`}>
                      {occurrence.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                    <td colSpan={4} className="text-center p-8 text-brand-light/70">
                        Nenhuma ocorrência encontrada para os filtros selecionados.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <OccurrenceModal occurrence={selectedOccurrence} onClose={() => setSelectedOccurrence(null)} onUpdate={handleUpdateOccurrence} />
    </>
  );
};

export default OccurrencesList;
