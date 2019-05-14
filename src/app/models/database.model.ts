export interface IFormula {
  id?: number;
  name: string;
  desc: string;
  specialtyIds: number[];
  form: IForm;
  info: IInfo;
  result: IResult;
}

export interface IInfo {
  pearlsPitfalls: string;
  nextstep: INextStep;
  evidence: IEvidence;
  creatorId: number;
}

export interface INextStep {
  advice: string;
  management: string;
  criticalActions: string;
}

export interface IEvidence {
  formula: string;
  factsAndFigure: string;
  evidenceAppraisal: string;
  literature: ILink[];
  validation: ILink[];
}

export interface ILink {
  desc: string;
  link: string;
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
  unit: string;
  classes: IResultClass[];
}
export interface IResultClass {
  lowRange: number;
  highRange: number;
  desc: string;
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
