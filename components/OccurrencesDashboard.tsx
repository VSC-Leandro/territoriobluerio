import React, { useState, useMemo, useEffect } from 'react';
import { OCCURRENCES_DATA } from '../data';
import { Occurrence } from '../types';
import { REGIONS_DATA } from '../regions';

const KpiCard: React.FC<{ title: string; value: number; color: string }> = ({ title, value, color }) => (
  <div className="bg-brand-dark/50 p-6 rounded-lg border-l-4" style={{ borderColor: color }}>
    <p className="text-brand-light/70 text-sm font-semibold uppercase tracking-wider">{title}</p>
    <p className="text-4xl font-bold text-white">{value}</p>
  </div>
);

const BarChart: React.FC<{ data: { label: string; value: number }[] }> = ({ data }) => {
    const maxValue = useMemo(() => Math.max(...data.map(d => d.value), 1), [data]);
    const barHeight = 30;
    const barMargin = 15;
    const labelWidth = 150;
    const valueLabelWidth = 40;
    const chartHeight = data.length * (barHeight + barMargin);
    const barAreaWidth = 300;
    const chartWidth = labelWidth + barAreaWidth + valueLabelWidth;

    return (
        <div className="overflow-x-auto">
            <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="font-sans">
                <g>
                    {data.map((d, i) => {
                        const barWidthValue = d.value > 0 ? (d.value / maxValue) * barAreaWidth : 0;
                        const y = i * (barHeight + barMargin);

                        return (
                            <g key={d.label} transform={`translate(0, ${y})`}>
                                <text
                                    x={labelWidth - 10}
                                    y={barHeight / 2}
                                    textAnchor="end"
                                    alignmentBaseline="middle"
                                    fill="#E0E0E0"
                                    fontSize="12"
                                    className="font-semibold"
                                >
                                    {d.label}
                                </text>
                                <rect 
                                    x={labelWidth} 
                                    y={0} 
                                    width={barWidthValue} 
                                    height={barHeight} 
                                    fill="#39FAC9" 
                                    className="transition-all" 
                                    rx="3"
                                    ry="3"
                                />
                                <text
                                    x={labelWidth + barWidthValue + 10}
                                    y={barHeight / 2}
                                    textAnchor="start"
                                    alignmentBaseline="middle"
                                    fill="#FFFFFF"
                                    fontSize="14"
                                    fontWeight="bold"
                                >
                                    {d.value}
                                </text>
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
};

const DonutChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    if (total === 0) {
        return <div className="flex items-center justify-center h-full text-brand-light/50">Sem dados para exibir</div>;
    }
    
    const radius = 80;
    const innerRadius = 50;
    const size = radius * 2;
    let startAngle = -Math.PI / 2;

    const getArcPath = (start: number, end: number) => {
        const startPoint = {
            x: radius + radius * Math.cos(start),
            y: radius + radius * Math.sin(start)
        };
        const endPoint = {
            x: radius + radius * Math.cos(end),
            y: radius + radius * Math.sin(end)
        };
        const largeArcFlag = end - start <= Math.PI ? "0" : "1";
        return `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y}`;
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-8">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <g transform={`translate(${radius}, ${radius})`}>
                    {data.map(d => {
                        if(d.value === 0) return null;
                        const angle = (d.value / total) * 2 * Math.PI;
                        const pathData = getArcPath(startAngle, startAngle + angle - 0.02); // -0.02 for small gap
                        startAngle += angle;
                        return <path key={d.label} d={pathData} stroke={d.color} strokeWidth={radius - innerRadius} fill="none" />;
                    })}
                </g>
            </svg>
            <div className="flex flex-col gap-2">
                {data.map(d => (
                    <div key={d.label} className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: d.color }}></div>
                        <span className="text-brand-light text-sm">{d.label} ({d.value})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const OccurrencesDashboard: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState('Todos');
    const [sectorFilter, setSectorFilter] = useState('Todos');
    const [regionFilter, setRegionFilter] = useState('Todas');
    const [cityFilter, setCityFilter] = useState('Todas');

    const uniqueSectors = useMemo(() => {
        const sectors = new Set(OCCURRENCES_DATA.map(o => o.sector));
        return ['Todos', ...Array.from(sectors)];
    }, []);
    
    const availableCities = useMemo(() => {
        if (regionFilter === 'Todas') {
            return [];
        }
        const selectedRegion = REGIONS_DATA.find(r => r.name === regionFilter);
        return selectedRegion ? selectedRegion.cities : [];
    }, [regionFilter]);

    useEffect(() => {
        setCityFilter('Todas');
    }, [regionFilter]);

    const filteredOccurrences = useMemo(() => {
        return OCCURRENCES_DATA.filter(o => {
            const isInProgress = o.status === 'A Caminho' || o.status === 'No Local' || o.status === 'Encaminhado';
            const matchesStatus = statusFilter === 'Todos' ||
                (statusFilter === 'Em Andamento' && isInProgress) ||
                o.status === statusFilter;
            const matchesSector = sectorFilter === 'Todos' || o.sector === sectorFilter;
            const matchesRegion = regionFilter === 'Todas' || o.region === regionFilter;
            const matchesCity = cityFilter === 'Todas' || o.city === cityFilter;
            return matchesStatus && matchesSector && matchesRegion && matchesCity;
        });
    }, [statusFilter, sectorFilter, regionFilter, cityFilter]);

    const kpiData = useMemo(() => {
        return {
            total: filteredOccurrences.length,
            pending: filteredOccurrences.filter(o => o.status === 'Pendente').length,
            inProgress: filteredOccurrences.filter(o => o.status === 'A Caminho' || o.status === 'No Local' || o.status === 'Encaminhado').length,
            resolved: filteredOccurrences.filter(o => o.status === 'Resolvido').length,
            notResolved: filteredOccurrences.filter(o => o.status === 'Não Resolvido').length,
        };
    }, [filteredOccurrences]);

    const sectorChartData = useMemo(() => {
        const counts: { [key: string]: number } = {};
        filteredOccurrences.forEach(o => {
            counts[o.sector] = (counts[o.sector] || 0) + 1;
        });
        return Object.entries(counts).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
    }, [filteredOccurrences]);

    const statusChartData = useMemo(() => [
        { label: 'Pendente', value: kpiData.pending, color: '#FBC02D' },
        { label: 'Em Andamento', value: kpiData.inProgress, color: '#3B82F6' },
        { label: 'Resolvido', value: kpiData.resolved, color: '#39FAC9' },
        { label: 'Não Resolvido', value: kpiData.notResolved, color: '#F28B82' }
    ], [kpiData]);
    
    const selectStyles = "bg-brand-dark/50 border-2 border-brand-green/30 text-brand-light rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-green-dark transition-colors";

    return (
        <div className="flex-1 bg-brand-dark p-8 space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-brand-light mb-2">Dashboard de Ocorrências</h2>
                <p className="text-brand-light/70">Visão geral e qualitativa dos chamados registrados.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 flex-wrap">
                <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} className={selectStyles}>
                    <option value="Todas">Todas as Regiões</option>
                    {REGIONS_DATA.map(region => (
                        <option key={region.name} value={region.name}>{region.name}</option>
                    ))}
                </select>
                <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className={selectStyles} disabled={regionFilter === 'Todas'}>
                    <option value="Todas">Todas as Cidades</option>
                    {availableCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className={selectStyles}>
                    <option value="Todos">Todos os Status</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Resolvido">Resolvido</option>
                    <option value="Não Resolvido">Não Resolvido</option>
                </select>
                <select value={sectorFilter} onChange={e => setSectorFilter(e.target.value)} className={selectStyles}>
                    {uniqueSectors.map(sector => (
                        <option key={sector} value={sector}>{sector === 'Todos' ? 'Todos os Setores' : sector}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <KpiCard title="Total de Ocorrências" value={kpiData.total} color="#E0E0E0" />
                <KpiCard title="Pendentes" value={kpiData.pending} color="#FBC02D" />
                <KpiCard title="Em Andamento" value={kpiData.inProgress} color="#3B82F6" />
                <KpiCard title="Resolvidas" value={kpiData.resolved} color="#39FAC9" />
                 <KpiCard title="Não Resolvidas" value={kpiData.notResolved} color="#F28B82" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-brand-dark/50 p-6 rounded-lg border border-brand-green/20">
                    <h3 className="text-xl font-bold text-white mb-4">Ocorrências por Setor</h3>
                    <BarChart data={sectorChartData} />
                </div>
                 <div className="bg-brand-dark/50 p-6 rounded-lg border border-brand-green/20">
                    <h3 className="text-xl font-bold text-white mb-4">Distribuição por Status</h3>
                    <DonutChart data={statusChartData} />
                </div>
            </div>
        </div>
    );
};

export default OccurrencesDashboard;