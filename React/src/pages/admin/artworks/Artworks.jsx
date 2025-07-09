import { useState }     from 'react';
import { useEffect }    from 'react';
import { useNavigate }  from 'react-router-dom';
import { getArtworks }  from '~/services/artworksService.js';
import ServerError      from '~/shared/server-error/ServerError.jsx';
import Loading          from '~/shared/loading/Loading.jsx';
import styles           from './Artworks.module.css'; // applies local styles

export default function Artworks() {
  const [artworks, setArtworks] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtworks()
      .then(res => setArtworks(res))
      .catch(_ => setError(true))
      .finally(_ => setLoading(false))
  }, []);

  if (error) return <ServerError />;
  if (loading) return <Loading />;

  return (
    <div className="container">
      <h2 className="mb-3"> Картини </h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col"> # </th>
            <th scope="col"> Заглавие </th>
            <th scope="col"> Цена </th>
          </tr>
        </thead>
        <tbody>
          <TableRows artworks={artworks} />
        </tbody>
      </table>
    </div>
  );
}

function TableRows({ artworks }) {
  const navigate = useNavigate();
  return artworks.map((a, i) => (
    <tr key={a.id} onClick={() => navigate(`/admin/artworks/update/${a.id}`)}>
      <th scope="row">{i + 1}</th>
      <td>{a.title}</td>
      <td>{a.price} лв</td>
    </tr>
  ));
}