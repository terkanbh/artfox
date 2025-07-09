import { useForm }            from 'react-hook-form';

import { addressValidator }   from '~/utils/validators.js';
import { firstNameValidator } from '~/utils/validators.js';
import { lastNameValidator }  from '~/utils/validators.js';
import { telValidator }       from '~/utils/validators.js';
import { emailValidator }     from '~/utils/validators.js';

export const useOrderForm = () => {
  const form = useForm({
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      tel: '',
      address: '',
      deliveryType: 'toOffice',
      deliveryPrice: 6.04
    }
  });

  const { register } = form;

  register('firstName', firstNameValidator);
  register('lastName', lastNameValidator);
  register('tel', telValidator);
  register('email', emailValidator);
  register('address', addressValidator);

  return form;
};