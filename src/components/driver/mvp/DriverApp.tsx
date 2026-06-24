import React from 'react';
import { DriverPreview } from '../full/DriverPreview';

interface MVPDriverProps {
  deliveries?: any[];
  setDeliveries?: React.Dispatch<React.SetStateAction<any[]>>;
}

export function MVPDriver({ deliveries, setDeliveries }: MVPDriverProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <DriverPreview 
        stops={deliveries} 
        setStops={setDeliveries} 
        pitchStage="mvp" 
      />
    </div>
  );
}
