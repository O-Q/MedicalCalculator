export interface IFormula {
  id?: number;
  name: string;
  desc: string;
  creatorId: number;
  specialtyIds: number[];
  form: IForm;
  advice: string;
  management: string;
  criticalActions: string;
  results: IResult[];
}
export interface ISpecialty {
  id?: number;
  name: string;
}
export interface ICreator {
  name: string;
  desc: string;
}
export interface IResult {
  // ???
}

export interface ICreators {
  id?: number;
  creators: ICreator[];
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
