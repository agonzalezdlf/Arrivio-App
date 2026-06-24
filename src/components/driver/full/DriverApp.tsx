import React from 'react';
import { DriverPreview } from './DriverPreview';

interface FullDriverProps {
  deliveries?: any[];
  setDeliveries?: React.Dispatch<React.SetStateAction<any[]>>;
}

export function FullDriver({ deliveries, setDeliveries }: FullDriverProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <DriverPreview 
        stops={deliveries} 
        setStops={setDeliveries} 
        pitchStage="scale" 
      />
    </div>
  );
}
