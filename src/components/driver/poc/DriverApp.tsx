import React from 'react';
import { DriverPreview } from '../full/DriverPreview';

interface POCDriverProps {
  deliveries?: any[];
  setDeliveries?: React.Dispatch<React.SetStateAction<any[]>>;
}

export function POCDriver({ deliveries, setDeliveries }: POCDriverProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <DriverPreview 
        stops={deliveries} 
        setStops={setDeliveries} 
        pitchStage="poc" 
      />
    </div>
  );
}
