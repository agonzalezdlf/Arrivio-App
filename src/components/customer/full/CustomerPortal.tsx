import React from 'react';
import { CustomerSimulator } from '../CustomerSimulator';

export function FullCustomer() {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <CustomerSimulator pitchStage="scale" />
    </div>
  );
}
