import { useEffect, useState }    from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast }                  from 'sonner';

import { deleteArtwork }  from '~/services/artworksService.js';
import { getArtwork }     from '~/services/artworksService.js';
import { updateArtwork }  from '~/services/artworksService.js';
import { updateImages }   from '~/services/imagesService.js';
import ServerError        from '~/shared/server-error/ServerError.jsx';
import Loading            from '~/shared/loading/Loading.jsx';
import ArtworkForm        from '~/shared/artwork-form/ArtworkForm.jsx';

export default function UpdateArtwork() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtwork(id)
      .then(res => {
        const imagesMap = [];
        res.images.map(image => imagesMap.push({
            id: image.imageId,
            previewUrl: `data:image/jpeg;base64,${image.imageData}`,
            displayOrder: image.displayOrder
        }));
        res.images = imagesMap;
        setArtwork(res);
      })
      .catch(_ => setError(true))
      .finally(_ => setLoading(false))
  }, []);

  if (error) return <ServerError />;
  if (loading) return <Loading />;

  const onSubmit = async (data, images, sizes) => {
    try {
      await updateArtwork({ ...data, sizes, id: artwork.id });
      toast.success('Продуктът е променен успешно.');

      try {
        await updateImages(artwork.id, images);
        toast.success('Снимките са променени успешно.');
      } catch (imgErr) { toast.error('Грешка при промяната на снимките.'); }

      navigate('/admin');
    } catch (err) { toast.error('Грешка при промяната на картината.'); }
  };

  const onDelete = () => {
    console.log('delete');
  }

  return <ArtworkForm initialValues={artwork} onSubmit={onSubmit} isUpdate={true}/>
}
