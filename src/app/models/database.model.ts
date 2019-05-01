export interface IFormula {
  id?: number;
  name: string;
  desc: string;
  form: IForm;
  advice: string;
  management: string;
  criticalActions: string;
  creatorId: number;
  result: IResult[];
}
export interface ISpecialty {
  id?: number;
  name: string;
}
export interface IResult {
  // ???
}
export interface IFormulaSpecialty {
  id?: number;
  specialtyId: number;
  formulaId: number;
}

export interface ICreators {
  id?: number;
  creators: ICreator[];
}
export interface ICreator {
  name: string;
  desc: string;
}

export interface IForm {
  inputs: IInput[];
  selects: ISelect[];
}

export interface ISelect {
  name: string;
  title: string;
  options: any;
  unit: string;
  type: string;
  hint: string;
  tip: string;
}
export interface IInput {
  name: string;
  title: string;
  unit: string;
  type: string;
  hint: string;
  tip: string;
}
