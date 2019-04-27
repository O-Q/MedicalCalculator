export interface IFormula {
  id?: number;
  name: string;
  desc: string;
  form: IForm;
  advice: string;
  management: string;
  criticalActions: string;
  creatorId: number;
  isFav: boolean;
}
export interface ISpecialty {
  id?: number;
  name: string;
}
export interface IFormulaSpecialty {
  id?: number;
  specialtyId: number;
  formulaId: number;
}

export interface ICreator {
  id?: number;
  name: string;
  desc: string;
}

export interface IForm {
  inputs: IInput[];
  selects: ISelect[];
}

export interface ISelect {
  title: string;
  unit: string;
  type: string;
  hint: string;
  tip: string;
}
export interface IInput {
  title: string;
  unit: string;
  type: string;
  hint: string;
  tip: string;
}
