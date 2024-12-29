export const formName: string = 'scoreForm';
export const formEndpoint: string = '/application/registration/';

type TScoreForm = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  options?: { value: string | number; label: string }[];
  required: boolean;
};

const gender = [
  {
    value: 'MALE',
    label: 'Male',
  },
  {
    value: 'FEMALE',
    label: 'Female',
  },
];

const maritalStatus = [
  {
    value: 'MARRIED',
    label: 'Married',
  },
  {
    value: 'DIVORCED',
    label: 'Divorced',
  },
  {
    value: 'SINGLE',
    label: 'Single',
  },
  {
    value: 'WIDOW_WIDOWER',
    label: 'Widow / Widower',
  },
];

const employmentStatus = [
  {
    value: 'UNEMPLOYED',
    label: 'Unemployed',
  },
  {
    value: 'SELF_EMPLOYED',
    label: 'Self-employed',
  },
  {
    value: 'EMPLOYED',
    label: 'Employed',
  },
  {
    value: 'BUSINESS_OWNER',
    label: 'Business owner',
  },
];

const position = [
  {
    value: 'WORKER',
    label: 'Worker',
  },
  {
    value: 'MID_MANAGER',
    label: 'Middle manager',
  },
  {
    value: 'TOP_MANAGER',
    label: 'Top manager',
  },
  {
    value: 'OWNER',
    label: 'Owner',
  },
];

const dependents = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
];

export const scoringFields: TScoreForm[] = [
  {
    name: 'gender',
    label: "What's your gender",
    type: 'select',
    options: Object.values(gender),
    placeholder: '',
    required: true,
  },
  {
    name: 'maritalStatus',
    label: 'Your marital status',
    type: 'select',
    options: Object.values(maritalStatus),
    placeholder: '',
    required: true,
  },
  {
    name: 'dependentAmount',
    label: 'Your number of dependents',
    type: 'select',
    options: Object.values(dependents),
    placeholder: '',
    required: true,
  },
  {
    name: 'passportIssueDate',
    label: 'Date of issue of the passport',
    type: 'date',
    placeholder: 'Select Date and Time',
    required: true,
  },
  {
    name: 'passportIssueBranch',
    label: 'Division code',
    type: 'text',
    placeholder: '000-000',
    required: true,
  },
];

export const Employments = [
  {
    name: 'employmentStatus',
    label: 'Your employment status',
    type: 'select',
    options: Object.values(employmentStatus),
    placeholder: '',
    required: true,
  },
  {
    name: 'employerINN',
    label: 'Your employer INN',
    type: 'text',
    placeholder: '000000000000',
    required: true,
  },
  {
    name: 'salary',
    label: 'Your salary',
    type: 'text',
    placeholder: 'For example 100 000',
    required: true,
  },
  {
    name: 'position',
    label: 'Your position',
    type: 'select',
    placeholder: '',
    options: Object.values(position),
    required: true,
  },
  {
    name: 'workExperienceTotal',
    label: 'Your work experience total',
    type: 'text',
    placeholder: 'For example 10',
    required: true,
  },
  {
    name: 'workExperienceCurrent',
    label: 'Your work experience current',
    type: 'text',
    placeholder: 'For example 2',
    required: true,
  },
];
