export const TEXT = /^\w+$/;
export const AGE = /^[1-9]\d{,2}$/;
export const NAME = /^\w{3,}$/;
export const MALE = 'Male';
export const FEMALE = 'Female';
export const REMOVE_CONFIRM_MESSAGE =
  'Are you sure, you want to remove this member?';

export const CITY_LIST = [
  'Chennai',
  'Mumbai',
  'Delhi',
  'Kolkata',
  'Jaipur',
  'Blore',
  'Pune',
  'Hyd',
  'Kochi',
  'Goa',
  'Vizag',
];

export const COLOR_LIST = [
  'White',
  'Black',
  'Cyan',
  'Violet',
  'Indigo',
  'Blue',
  'Green',
  'Yellow',
  'Orange',
  'Red',
  'Pink',
];

export const NAME_LIST = [
  'Kartik',
  'Ganesh',
  'Ram',
  'Hari',
  'Rakesh',
  'Suresh',
  'John',
  'Mark',
  'Ramesh',
  'Jitu',
  'Ambu',
  'Abhi',
  'Scott',
  'Durga',
  'Swati',
  'Rani',
  'Revathy',
  'Preethi',
  'Sasmita',
  'Rasmita',
  'Reshma',
];

export const fields = {
  name: {
    label: 'Name',
    type: 'text',
    validation: value => NAME.test(value),
  },
  age: {
    label: 'Age',
    type: 'number',
    validation: value => AGE.test(value),
  },
  gender: {
    label: 'Gender',
    type: 'select',
    validation: value => [MALE, FEMALE].includes(value),
  },
  color: {
    label: 'Fav Color',
    type: 'text',
    validation: value => TEXT.test(value),
  },
};
