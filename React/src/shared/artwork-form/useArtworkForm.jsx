import { useForm }              from 'react-hook-form';

import { priceValidator }       from '~/utils/validators.js';
import { titleValidator }       from '~/utils/validators.js';
import { descriptionValidator } from '~/utils/validators.js';

export const useArtworkForm = (defaultValues = null) => {
  const form = useForm({
    mode: 'onTouched',
    defaultValues: {
      title: defaultValues?.title || "",
      price: defaultValues?.price || "",
      description: defaultValues?.description || "",
      sizes: defaultValues?.sizes || []
    }
  });

  const { register } = form;

  register('price', priceValidator);
  register('title', titleValidator);
  register('description', descriptionValidator);

  return form;
};