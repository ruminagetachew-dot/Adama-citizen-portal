export const ROLES = {
  CITIZEN: 'citizen',
  ADMIN: 'admin',
  OFFICER: 'officer',
};

export const STATUSES = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  CLOSED: 'closed',
};

export const STATUS_LABELS = {
  pending: 'Pending',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  rejected: 'Rejected',
  closed: 'Closed',
};

export const COMPLAINT_CATEGORIES = [
  'roadMaintenance',
  'wasteManagement',
  'waterSupply',
  'streetLighting',
  'drainage',
  'publicSafety',
  'noisePollution',
  'other',
];

/** Maps stored category values to i18n keys under categories.* */
export const CATEGORY_I18N_KEYS = {
  roadMaintenance: 'roadMaintenance',
  wasteManagement: 'wasteManagement',
  waterSupply: 'waterSupply',
  streetLighting: 'streetLighting',
  drainage: 'drainage',
  publicSafety: 'publicSafety',
  noisePollution: 'noisePollution',
  other: 'other',
};

export const ADAMA_LOCATIONS = [
  // Real Adama City Neighborhoods (Sefer/ሰፈር) - verified by user
  'Adababye',
  'Ali Bira',
  'Bole',
  'Central',
  'Goro',
  'Medhanialem',
  'Stadium',
];

// Hierarchical Location System for Adama City
export const ADAMA_KEBELES = [
  '01 Kebele',
  '02 Kebele',
  '03 Kebele',
  '04 Kebele',
  '05 Kebele',
  '06 Kebele',
  '07 Kebele',
  '08 Kebele',
  '09 Kebele',
  '10 Kebele',
  '11 Kebele',
  '12 Kebele',
  '13 Kebele',
  '14 Kebele',
  '15 Kebele',
  '16 Kebele',
  '17 Kebele',
  '18 Kebele',
];

export const ADAMA_LANDMARKS = [
  'Adama Science and Technology University (ASTU)',
  'Adama Stadium',
  'Adama City Administration',
  'Adama General Hospital',
  'College of Health Science AGHMC',
  'Adama Railway Station',
  'Adama City Bus Station (Autobus Tera)',
  'Adama Central Market (Merkato)',
  'Adama Industrial Park',
  'Adama City Court',
  'Adama Police Station',
  'Adama Main Post Office',
  'Adama Fire and Emergency Service',
];

export const DEMO_ACCOUNTS = [
  { email: 'citizen@test.com', password: 'citizen123', label: 'Citizen' },
  { email: 'admin@test.com', password: 'admin123', label: 'Administrator' },
  { email: 'officer@test.com', password: 'officer123', label: 'Department Officer' },
];
