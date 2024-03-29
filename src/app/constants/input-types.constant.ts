// pressure
export enum UnitTypes {
  WEIGHT = 'weight',
  AGE = 'age',
  HEIGHT = 'height',
  DENSITY = 'density',
  INV_DENSITY = 'InvDensity',
  VOLUME = 'volume',
  PRESSURE = 'pressure'
}
export const Units: {
  [name: string]: { default: string; secondary: string };
} = {};
Units[UnitTypes.WEIGHT] = { default: 'kg', secondary: 'lbs' };
Units[UnitTypes.AGE] = { default: 'year', secondary: null };
Units[UnitTypes.HEIGHT] = { default: 'cm', secondary: 'in' };
Units[UnitTypes.DENSITY] = { default: 'mmolL', secondary: 'mgdl' };
Units[UnitTypes.INV_DENSITY] = { default: 'mlkg', secondary: null };
Units[UnitTypes.VOLUME] = { default: 'ml', secondary: null };
Units[UnitTypes.PRESSURE] = { default: 'mmHg', secondary: 'kPa' };

export const convertable = [
  UnitTypes.WEIGHT,
  UnitTypes.HEIGHT,
  UnitTypes.DENSITY,
  UnitTypes.PRESSURE
];
