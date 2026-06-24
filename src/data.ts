import { Delivery, RouteStats } from './types';

export const ROUTE_SUMMARIES: RouteStats[] = [
  { 
    routeId: 'MAD-NORTH-A1', 
    driverName: 'Carlos M.', 
    totalStops: 124, 
    reliability: 94, 
    potentialFailures: 3, 
    aiInterventions: 12,
    role: 'delivery',
    completedStops: [
      { id: 'D-1100', address: 'Calle de Velázquez 12, Madrid', status: 'success', time: '07:45' },
      { id: 'D-1101', address: 'Calle de Goya 4, Madrid', status: 'failed', time: '07:55' }
    ]
  },
  { 
    routeId: 'MAD-NORTH-A2', 
    driverName: 'Ricardo P.', 
    totalStops: 118, 
    reliability: 91, 
    potentialFailures: 4, 
    aiInterventions: 15,
    role: 'delivery',
    completedStops: []
  },
  { 
    routeId: 'MAD-CENTRAL-B2', 
    driverName: 'Elena G.', 
    totalStops: 142, 
    reliability: 68, 
    potentialFailures: 14, 
    aiInterventions: 28,
    role: 'pickup',
    completedStops: [
      { id: 'P-1001', address: 'Mango Store, Gran Vía 32, Madrid', status: 'success', time: '08:15' }
    ]
  },
  { 
    routeId: 'MAD-CENTRAL-B3', 
    driverName: 'Miguel S.', 
    totalStops: 130, 
    reliability: 82, 
    potentialFailures: 8, 
    aiInterventions: 21,
    role: 'pickup',
    completedStops: []
  },
  { 
    routeId: 'MAD-EAST-C4', 
    driverName: 'Javier R.', 
    totalStops: 110, 
    reliability: 89, 
    potentialFailures: 5, 
    aiInterventions: 8,
    role: 'delivery',
    completedStops: []
  },
  { 
    routeId: 'MAD-SOUTH-D8', 
    driverName: 'Sofia L.', 
    totalStops: 135, 
    reliability: 74, 
    potentialFailures: 11, 
    aiInterventions: 19,
    role: 'pickup',
    completedStops: [
      { id: 'P-1005', address: 'Inditex Hub, Valdemoro', status: 'success', time: '07:30' }
    ]
  },
  { 
    routeId: 'MAD-WEST-E1', 
    driverName: 'Antonio K.', 
    totalStops: 95, 
    reliability: 96, 
    potentialFailures: 2, 
    aiInterventions: 5,
    role: 'delivery',
    completedStops: []
  },
];

const MANUAL_STOPS: Delivery[] = [
  // MAD-NORTH-A1 (Delivery Route)
  {
    id: 'D-2210',
    userId: 'Lucía Fernández',
    entityId: 'NIF: 45678912K',
    address: 'Avenida de América 101, Madrid',
    predictedProbability: 0.98,
    suggestedSlot: '08:30 - 09:30',
    assignedRoute: 'MAD-NORTH-A1',
    status: 'pending',
    priority: false,
    stopType: 'delivery',
    historyCount: 24,
    notes: 'Strong morning presence confirmed by multi-provider data',
    predictedArrival: '08:45',
    confidenceScore: 98
  },
  {
    id: 'D-9842',
    userId: 'Carlos Ruiz',
    entityId: 'NIE: X1234567L',
    address: 'Calle de Serrano 45, Madrid',
    predictedProbability: 0.94,
    suggestedSlot: '09:30 - 10:30',
    assignedRoute: 'MAD-NORTH-A1',
    status: 'pending',
    priority: false,
    stopType: 'delivery',
    historyCount: 12,
    notes: 'Usually receives in morning slots',
    predictedArrival: '10:05',
    confidenceScore: 92
  },
  
  // MAD-CENTRAL-B2 (Pickup from Retailers)
  {
    id: 'P-1001',
    userId: 'RETAIL-ZARA-1',
    entityId: 'CIF: B81234567',
    storeName: 'Zara Serrano',
    address: 'Zara, Calle de Serrano 23, Madrid',
    predictedProbability: 0.99,
    suggestedSlot: '08:00 - 09:00',
    assignedRoute: 'MAD-CENTRAL-B2',
    status: 'pending',
    priority: true,
    stopType: 'pickup',
    historyCount: 340,
    notes: 'Retailer pickup. Docking bay #4.',
    predictedArrival: '08:15',
    confidenceScore: 99
  },
  {
    id: 'P-1002',
    userId: 'RETAIL-MANGO-1',
    entityId: 'CIF: B28987654',
    storeName: 'Mango Gran Vía',
    address: 'Mango, Gran Vía 32, Madrid',
    predictedProbability: 0.97,
    suggestedSlot: '10:00 - 11:00',
    assignedRoute: 'MAD-CENTRAL-B2',
    status: 'pending',
    priority: true,
    stopType: 'pickup',
    historyCount: 210,
    notes: 'Regular retailer volume. High availability.',
    predictedArrival: '10:15',
    confidenceScore: 97
  }
];

const generateEntityId = (isPickup: boolean) => {
  if (isPickup) {
    return `CORP-ID-${Math.floor(Math.random() * 900) + 100}`;
  }
  
  const type = Math.random();
  if (type < 0.7) {
    // NIF
    const num = Math.floor(Math.random() * 90000000) + 10000000;
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    return `NIF: ${num}${letters[num % 23]}`;
  } else if (type < 0.9) {
    // NIE
    const prefix = ['X', 'Y', 'Z'][Math.floor(Math.random() * 3)];
    const num = Math.floor(Math.random() * 9000000) + 1000000;
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    return `NIE: ${prefix}${num}${letters[num % 23]}`;
  } else {
    // Passport
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const num = Math.floor(Math.random() * 900000) + 100000;
    return `PASS: ${chars[Math.floor(Math.random() * 26)]}${chars[Math.floor(Math.random() * 26)]}${num}`;
  }
};

const GENERATED_STOPS: Delivery[] = Array.from({ length: 200 }).map((_, i) => {
  const routeId = ROUTE_SUMMARIES[i % ROUTE_SUMMARIES.length].routeId;
  const isPickup = i % 2 === 0;
  
  const retailers = ['Zara', 'Mango', 'Massimo Dutti', 'Pull&Bear', 'Stradivarius', 'Bershka', 'Oysho', 'Cortefiel', 'Sfera', 'El Corte Inglés', 'H&M', 'Primark', 'Decathlon', 'IKEA', 'MediaMarkt'];
  const customers = ['Andrés García', 'María Rodríguez', 'Juan Pérez', 'Ana Martínez', 'Sonia López', 'Toni Ruiz', 'Marta Sánchez', 'Laura Blanco', 'Javier Cano', 'Beatriz Ortiz', 'Roberto Gil', 'Cristina Sanz'];
  
  const hour = Math.floor(Math.random() * 4) + 8; // 8 to 11
  const minute = ['00', '15', '30', '45'][Math.floor(Math.random() * 4)];
  const userId = isPickup ? `RETAIL-${i % 50}` : customers[i % customers.length];
  
  return {
    id: `${isPickup ? 'RTL' : 'CST'}-${routeId.split('-').pop()}-${3000 + i}`,
    userId: userId,
    entityId: generateEntityId(isPickup),
    storeName: isPickup ? retailers[i % retailers.length] : undefined,
    address: `Calle de ${['Alcalá', 'Goya', 'Serrano', 'Velázquez', 'Princesa', 'Castellana', 'Recoletos', 'Mayor', 'Bailén', 'Atocha'][i % 10]} ${10 + i}, Madrid`,
    predictedProbability: 0.91 + Math.random() * 0.08,
    suggestedSlot: isPickup ? `${hour}:00 - ${hour + 1}:15` : `${hour + 2}:00 - ${hour + 3}:15`,
    assignedRoute: routeId,
    status: 'pending' as const,
    priority: Math.random() > 0.8, 
    stopType: (isPickup ? 'pickup' : 'delivery') as any,
    historyCount: Math.floor(Math.random() * 100) + 15,
    predictedArrival: `${hour}:${minute}`,
    confidenceScore: 91 + Math.floor(Math.random() * 8)
  };
});

export const MOCK_DELIVERIES: Delivery[] = [...MANUAL_STOPS, ...GENERATED_STOPS];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    to: 'End Customer',
    message: 'Your package is expected between 13:00–15:00. This slot was chosen based on your previous successful deliveries.',
    type: 'success'
  },
  {
    id: 'n2',
    to: 'Retailer (Zara)',
    message: 'Delivery success probability improved by 22% after shifting slot from AM to PM.',
    type: 'insight'
  }
];

export const NETWORK_STATS = {
  totalDeliveriesLearned: '14,200,340',
  participatingProviders: 12,
  confidenceImprovement: '+18.4%',
  providerList: ['SEUR', 'Correos', 'Celeritas', 'MRW', 'TNT', 'DHL España', 'Zeleris', 'Glovo Business', 'TIPSA', 'CTT Express', 'GLS Spain', 'Ontime']
};
