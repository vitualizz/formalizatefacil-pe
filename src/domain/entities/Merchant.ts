export type DocumentType = 'DNI' | 'RUC';

export interface Merchant {
  name: string;
  document: string;
  documentType: DocumentType;
  occupation: string;
  district: string;
}

export interface StepFormalization {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
