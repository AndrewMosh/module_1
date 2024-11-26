type TMenu = {
  id: number;
  name: string;
  link: string;
};

type TContacts = {
  id: number;
  name: string;
  link: string;
  flag: string;
};

export const fMenu: TMenu[] = [
  { id: 1, name: 'About bank', link: '/' },
  { id: 2, name: 'Ask a Question', link: '/' },
  { id: 3, name: 'Quality of service', link: '/' },
  { id: 4, name: 'Requisites', link: '/' },
  { id: 5, name: 'Press center', link: '/' },
  { id: 6, name: 'Bank career', link: '/' },
  { id: 7, name: 'Investors', link: '/' },
  { id: 8, name: 'Analytics', link: '/' },
  { id: 9, name: 'Business and processes', link: '/' },
  { id: 10, name: 'Compliance and business ethics', link: '/' },
];

export const contacts: TContacts[] = [
  {
    id: 1,
    name: '+7 (495) 984 25 13',
    link: 'tel:+74959842513',
    flag: 'phone',
  },
  {
    id: 2,
    name: 'info@neoflex.ru',
    link: 'mailto:info@neoflex.ru',
    flag: 'email',
  },
];

export const cookiesInfo: string =
  'We use cookies to personalize our services and improve the user experience of our website. Cookies are small files containing information about previous visits to a website. If you do not want to use cookies, please change your browser settings';
