import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { MENU_STRUCTURE } from '../constants';
import { MapPointType, SubMenuKey, MapPoint } from '../types';
import { MAP_DATA } from '../data';
import { SearchIcon, FloodsIcon, DonationIcon, VolunteersIcon, CheckCircleIcon, PlusIcon } from './icons';

const MapComponent: React.FC<{ activeSubMenu: MapPointType | null }> = ({ activeSubMenu }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markerLayerRef = useRef<L.LayerGroup | null>(null);

    useEffect(() => {
        if (mapContainerRef.current && !mapInstanceRef.current) {
            const map = L.map(mapContainerRef.current, {
                center: [-22.92, -43.28],
                zoom: 12,
                zoomControl: false,
                attributionControl: false,
            });

            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 19,
            }).addTo(map);

            mapInstanceRef.current = map;
            markerLayerRef.current = L.layerGroup().addTo(map);
        }
    }, []);

    useEffect(() => {
        if (!markerLayerRef.current || !mapInstanceRef.current) return;

        markerLayerRef.current.clearLayers();

        const pointsToRender: { point: MapPoint; type: MapPointType }[] = [];
        const mapSubmenus = MENU_STRUCTURE.MAP.submenus;

        if (activeSubMenu && mapSubmenus[activeSubMenu]) {
            const points = MAP_DATA[activeSubMenu] ?? [];
            points.forEach(p => pointsToRender.push({ point: p, type: activeSubMenu }));
        } else {
            for (const type in mapSubmenus) {
                const mapPointType = type as MapPointType;
                const points = MAP_DATA[mapPointType] ?? [];
                points.forEach(p => pointsToRender.push({ point: p, type: mapPointType }));
            }
        }

        if (pointsToRender.length === 0) {
            mapInstanceRef.current.flyTo([-22.92, -43.28], 12);
            return;
        }

        pointsToRender.forEach(({ point, type }) => {
            const Icon = mapSubmenus[type]?.Icon;
            if (!Icon) return;
            
            const iconHTML = ReactDOMServer.renderToString(<Icon className="w-5 h-5 text-brand-dark" />);
            const customIcon = L.divIcon({
                html: iconHTML,
                className: 'custom-div-icon',
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40]
            });

            const popupContent = `
                <div>
                    <h3 style="font-weight: 700; font-size: 16px; color: #39FAC9; margin: 0 0 4px 0;">${point.title}</h3>
                    <p style="font-size: 14px; color: #E0E0E0; margin: 0 0 8px 0;">${point.description}</p>
                    <span style="font-size: 12px; color: #E0E0E0; opacity: 0.7;">${point.date}</span>
                </div>
            `;
            
            const marker = L.marker(point.coords, { icon: customIcon }).bindPopup(popupContent);
            markerLayerRef.current?.addLayer(marker);
        });

        const bounds = L.latLngBounds(pointsToRender.map(p => p.point.coords));
        mapInstanceRef.current.flyToBounds(bounds, { padding: [50, 50], maxZoom: 14 });

    }, [activeSubMenu]);

    return <div ref={mapContainerRef} className="w-full h-full" />;
};

const RegistrationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [selectedType, setSelectedType] = useState<MapPointType | null>(null);
    const [address, setAddress] = useState('');
    const [details, setDetails] = useState('');

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleReset = () => {
        setStep(1);
        setSelectedType(null);
        setAddress('');
        setDetails('');
        onClose();
    }

    const handleTypeSelect = (type: MapPointType) => {
        setSelectedType(type);
        handleNext();
    };

    const handleSubmit = () => {
        console.log('Submitting occurrence:', { type: selectedType, address, details });
        handleNext();
    };

    const reportTypesForRegistration = Object.keys(MENU_STRUCTURE.MAP.submenus) as MapPointType[];

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h2 className="font-bold text-3xl text-center">Qual o tipo da ocorrência?</h2>
                        <p className="text-lg text-center text-brand-dark/80">Selecione uma das opções abaixo para continuar.</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                            {reportTypesForRegistration.map((type) => {
                                const submenu = MENU_STRUCTURE.MAP.submenus[type];
                                if (!submenu) return null;
                                const { Icon, label } = submenu;
                                return (
                                    <button
                                        key={type}
                                        onClick={() => handleTypeSelect(type)}
                                        className="flex flex-col items-center justify-center space-y-2 p-4 bg-brand-dark/5 hover:bg-brand-dark/10 rounded-lg transition-colors transform hover:-translate-y-1"
                                    >
                                        <div className="w-16 h-16 bg-brand-dark text-brand-green rounded-full flex items-center justify-center">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <span className="font-semibold text-center">{label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </>
                );
            case 2:
                // Same as before
                return (
                     <>
                        <h2 className="font-bold text-3xl">Informe o endereço</h2>
                        <p className="text-lg text-brand-dark/80">Digite o endereço completo da ocorrência.</p>
                        <div className="relative pt-4">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 mt-2" />
                            <input
                                id="address-search"
                                type="text"
                                placeholder="Ex: Rua Conde de Bonfim, 123, Tijuca"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full bg-brand-light text-brand-dark placeholder-gray-500 rounded-md py-4 pl-14 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-brand-dark"
                                autoFocus
                            />
                        </div>
                        <div className="flex justify-between mt-6">
                            <button onClick={handleBack} className="bg-brand-dark/20 text-brand-dark font-bold py-3 px-6 rounded-md hover:bg-brand-dark/30 transition-colors">VOLTAR</button>
                            <button onClick={handleNext} disabled={!address} className="bg-brand-dark text-brand-green font-bold py-3 px-6 rounded-md hover:bg-black transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">PRÓXIMO</button>
                        </div>
                    </>
                );
            case 3:
                 const selectedLabel = selectedType ? MENU_STRUCTURE.MAP.submenus[selectedType]?.label : 'N/A';
                 return (
                    <>
                        <h2 className="font-bold text-3xl">Detalhes e Confirmação</h2>
                        <p className="text-lg text-brand-dark/80">Revise as informações e adicione mais detalhes se necessário.</p>
                        <div className="bg-brand-dark/5 p-4 rounded-lg my-4 space-y-2">
                            <p><strong>Tipo:</strong> {selectedLabel}</p>
                            <p><strong>Endereço:</strong> {address}</p>
                        </div>
                        <textarea
                            placeholder="Adicione uma descrição (opcional)..."
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            className="w-full h-24 bg-brand-light text-brand-dark placeholder-gray-500 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-brand-dark"
                        />
                        <div className="flex justify-between mt-6">
                            <button onClick={handleBack} className="bg-brand-dark/20 text-brand-dark font-bold py-3 px-6 rounded-md hover:bg-brand-dark/30 transition-colors">VOLTAR</button>
                            <button onClick={handleSubmit} className="bg-brand-dark text-brand-green font-bold py-3 px-6 rounded-md hover:bg-black transition-colors">REGISTRAR</button>
                        </div>
                    </>
                );
            case 4:
                // Same as before
                return (
                    <div className="text-center flex flex-col items-center justify-center space-y-4">
                        <CheckCircleIcon className="w-24 h-24 text-brand-dark"/>
                        <h2 className="font-bold text-3xl">Ocorrência registrada!</h2>
                        <p className="text-lg max-w-md">Obrigado por sua colaboração. As equipes responsáveis já foram notificadas.</p>
                        <button onClick={handleReset} className="bg-brand-dark text-brand-green font-bold py-3 px-10 mt-4 rounded-md hover:bg-black transition-colors">FECHAR</button>
                    </div>
                );
            default:
                return null;
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[2000] p-4" onClick={handleReset}>
            <div
                className="relative bg-brand-green text-brand-dark p-8 rounded-lg shadow-2xl w-full max-w-2xl flex flex-col space-y-4 transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {step < 4 && (
                    <button onClick={handleReset} className="absolute top-2 right-2 text-brand-dark hover:text-black">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                )}
                {renderStepContent()}
            </div>
        </div>
    );
};


const RegistrationTrigger: React.FC<{onOpen: () => void}> = ({ onOpen }) => (
    <>
        {/* Mobile Button: Round with Plus Icon */}
        <button 
            onClick={onOpen} 
            className="md:hidden absolute bottom-8 right-6 bg-brand-green text-brand-dark w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer z-[1000]"
            aria-label="Registrar uma ocorrência"
        >
            <PlusIcon className="w-7 h-7"/>
        </button>

        {/* Desktop Button: Original Design (cleaned up for md+) */}
        <button 
            onClick={onOpen} 
            className="hidden md:flex absolute bottom-8 right-8 bg-brand-green text-brand-dark p-4 rounded-lg items-center space-x-4 shadow-lg hover:bg-white transition-colors cursor-pointer z-[1000]"
            aria-label="Registrar uma ocorrência"
        >
            <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full bg-brand-dark text-brand-green flex items-center justify-center border-2 border-brand-green">
                    <FloodsIcon className="w-6 h-6"/>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-dark text-brand-green flex items-center justify-center border-2 border-brand-green">
                    <DonationIcon className="w-6 h-6"/>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-dark text-brand-green flex items-center justify-center border-2 border-brand-green">
                    <VolunteersIcon className="w-6 h-6"/>
                </div>
            </div>
            <p className="font-bold text-lg text-left">REGISTRE<br/>UMA<br/>OCORRÊNCIA</p>
        </button>
    </>
);


const MainContent: React.FC<{ activeSubMenu: MapPointType | null }> = ({ activeSubMenu }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex-1 relative bg-brand-dark overflow-hidden h-full">
      <MapComponent activeSubMenu={activeSubMenu} />
      
      <div className="absolute top-4 md:top-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md md:right-auto z-[1000]">
          <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-green" />
              <input
                  type="text"
                  aria-label="Buscar endereço ou local"
                  placeholder="Buscar endereço ou local..."
                  className="w-full bg-brand-dark/80 backdrop-blur-sm border-2 border-brand-green text-brand-light placeholder-brand-light/70 rounded-md py-3 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-brand-green-dark"
              />
          </div>
      </div>

      {!isModalOpen && <RegistrationTrigger onOpen={() => setIsModalOpen(true)} />}

      {isModalOpen && <RegistrationModal onClose={() => setIsModalOpen(false)} />}
    </main>
  );
};

export default MainContent;