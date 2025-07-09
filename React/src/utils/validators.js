export const nameValidator = { required: 'Името е задължително.' };
export const contentValidator = { required: 'Съдържанието е задължително.' };
export const firstNameValidator = { required: 'Името е задължително.' }
export const lastNameValidator = { required: 'Фамилията е задължителна.' }
export const telValidator = { required: 'Телефонният номер е задължителен.' };
export const emailValidator = { required: 'Имейла е задължителен.' };
export const addressValidator = { required: 'Адреса е задължителен.' };
export const priceValidator = { validate: value => !isNaN(value) && value > 0 || 'Цената трябва да е по-голяма от 0.'}
export const titleValidator = { required: 'Заглавието е задължително.' };
export const descriptionValidator = { required: 'Описанието е задължително.' };