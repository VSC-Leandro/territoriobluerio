
import React from 'react';
import OccurrencesList from './OccurrencesPanel';

const MyOccurrences: React.FC = () => {
  // In a real application, this would come from user authentication
  const currentUserId = 'user123';

  return (
    <OccurrencesList 
      title="Minhas Ocorrências" 
      assigneeId={currentUserId} 
    />
  );
};

export default MyOccurrences;
