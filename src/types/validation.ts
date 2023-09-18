export type ValidationRules = {
  [key: string]: {
    required?: boolean;
    custom?: (value: any) => boolean;
    customErrorMessage?: string;
  };
};
