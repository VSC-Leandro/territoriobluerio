
import React from 'react';

interface IconProps {
  className?: string;
}

export const TerritoryLogoIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 162 94" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60.4048 2.31691L42.508 19.9868H2V61.503H29.1418L33.0903 57.5545L45.4822 69.9464L44.1704 84.153L51.9796 92L64.3715 78.4716L72.8226 89.7208L82.6101 81.9116L95.002 92L105.431 82.5535L111.879 92L120.972 82.5535L127.42 88.3582L138.028 78.4716L135.404 66.0797L151.815 50.3103L160 38.5603L140.652 24.3527L115.145 28.9431L107.994 40.0519L95.6436 32.2427L82.6101 41.5435L71.4996 32.2427L74.8054 22.8021L60.4048 2.31691Z" stroke="currentColor" strokeWidth="3"/>
    </svg>
);

export const FloodsIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 8.25V15.75C3 18.2355 5.0145 20.25 7.5 20.25H16.5C18.9855 20.25 21 18.2355 21 15.75V8.25C21 5.7645 18.9855 3.75 16.5 3.75H7.5C5.0145 3.75 3 5.7645 3 8.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 10.5C8.5 10.5 9.5625 9.25 10.625 9.25C11.6875 9.25 12.75 10.5 13.8125 10.5C14.875 10.5 15.9375 9.25 17 9.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.5 14.25H16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const VulnerableHouseIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
);


export const DonationIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

export const VolunteersIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
