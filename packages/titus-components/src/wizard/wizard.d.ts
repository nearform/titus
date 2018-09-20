import * as React from 'react'

export interface WizardStepProps {
  id?: string;
  title?: string;
  description?: string;
  required?: boolean;
  requiredMessage?: string;
  stepsDataRequired?: boolean;
  stepIndex?: number;
  data?: object;
  stepsData?: Array<object>;
  stepsInfo?: Array<object>;
  handleSatisfied?: (stepIndex: number, stepSatisfied: boolean) => void;
  handleDataChanged?: (stepIndex: number, stepData: object) => void;
}

export interface WizardProps {
  title?: string;
  finishedMessage?: string;
  defaultRequiredMessage?: string;
  children: React.ReactElement<WizardStepProps>[];
  onFinish?: (data: object) => void;
}

declare class Wizard extends React.Component<WizardProps> {}

export Wizard
