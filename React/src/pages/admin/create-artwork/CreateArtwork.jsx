import { useNavigate }  from 'react-router-dom';
import { toast }        from 'sonner';

import { createArtwork }  from '~/services/artworksService.js';
import { updateImages }   from '~/services/imagesService.js';
import ArtworkForm        from '~/shared/artwork-form/ArtworkForm.jsx';

export default function CreateArtwork() {
  const navigate = useNavigate();

  const onSubmit = async (data, images, sizes) => {
    try {
      const artwork = await createArtwork({ ...data, sizes });
      toast.success('Продуктът е добавен успешно.');

      try {
        await updateImages(artwork.id, images);
        toast.success('Снимките са добавени успешно.');
      } catch (imgErr) { toast.error('Грешка при добавянето на снимките.'); }

      navigate('/admin');
    } catch (err) { toast.error('Грешка при добавянето на картината.'); }
  };

  return <ArtworkForm onSubmit={onSubmit} />
}
