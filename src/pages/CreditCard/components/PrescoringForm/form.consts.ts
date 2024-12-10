export const formName: string = 'contactForm';
export const formEndpoint: string = '/application';

type TForm = {
  name: string;
  label: string;
  type: 'text' | 'select' | 'date';
  placeholder: string;
  options?: { label: string; value: number }[];
  required: boolean;
  success?: boolean;
};

const terms = [
	{ label: '6 months', value: 6 },
	{ label: '12 months', value: 12 },
	{ label: '18 months', value: 18 },
	{ label: '24 months', value: 24 },
  ]

export const formFields: TForm[] = [
  {
    name: 'lastName',
    label: 'Your last name',
    type: 'text',
    placeholder: 'For Example Doe',
    required: true,
  },
  {
    name: 'firstName',
    label: 'Your first name',
    type: 'text',
    placeholder: 'For Example Jhon',
    required: true,
  },
  {
    name: 'middleName',
    label: 'Your patronymic',
    type: 'text',
    placeholder: 'For Example Victorovich',
    required: false,
  },
  {
    name: 'term',
    label: 'Select term',
    type: 'select',
    placeholder: terms[0].label,
    options: Object.values(terms),
    required: true,
  },
  {
    name: 'email',
    label: 'Your email',
    type: 'text',
    placeholder: 'test@gmail.com',
    required: true,
  },
  {
    name: 'birthdate',
    label: 'Your date of birth',
    type: 'date',
    placeholder: 'Select Date and Time',
    required: true,
  },
  {
    name: 'passportSeries',
    label: 'Your passport series',
    type: 'text',
    placeholder: '0000',
    required: true,
  },
  {
    name: 'passportNumber',
    label: 'Your passport number',
    type: 'text',
    placeholder: '000000',
    required: true,
  },
];
