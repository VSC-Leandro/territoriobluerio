
import React from 'react';

const Header: React.FC = () => {
  // Define alert data with municipalities, risk levels, and corresponding colors.
  const alerts = [
    { municipality: 'Rio de Janeiro', riskLevel: 'Risco Alto', colorClass: 'text-brand-red-light' },
    { municipality: 'Niterói', riskLevel: 'Risco Moderado', colorClass: 'text-brand-yellow' },
    { municipality: 'Duque de Caxias', riskLevel: 'Risco Muito Alto', colorClass: 'text-brand-red-dark' },
    { municipality: 'São Gonçalo', riskLevel: 'Risco Alto', colorClass: 'text-brand-red-light' },
    { municipality: 'Nova Iguaçu', riskLevel: 'Risco Muito Alto', colorClass: 'text-brand-red-dark' },
    { municipality: 'Belford Roxo', riskLevel: 'Risco Moderado', colorClass: 'text-brand-yellow' },
  ];

  // A component to render the list of alerts.
  // It's rendered twice to create a seamless scrolling effect.
  const AlertList = () => (
    <div className="flex-shrink-0 flex items-center">
      {alerts.map((alert, index) => (
        <span key={index} className="mx-4 text-brand-light whitespace-nowrap">
          ATENÇÃO CHUVA FORTE EM {alert.municipality.toUpperCase()} •{' '}
          <span className={`${alert.colorClass} font-extrabold`}>{alert.riskLevel.toUpperCase()}</span>
        </span>
      ))}
    </div>
  );

  return (
    // The main header container. overflow-hidden clips the content.
    <header className="bg-black font-bold w-full overflow-hidden h-10 flex items-center">
      {/* This container will be animated. It holds two copies of the content. */}
      <div className="animate-marquee flex">
        <AlertList />
        <AlertList />
      </div>
    </header>
  );
};

export default Header;