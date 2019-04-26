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
  inputs: {
    title: string;
    unit: string;
    type: string;
    hint: string;
    tip: string;
  }[];
  selects: {
    title: string;
    unit: string;
    type: string;
    hint: string;
    tip: string;
  }[];
}
