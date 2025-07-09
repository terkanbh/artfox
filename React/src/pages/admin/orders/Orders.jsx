import { useState }     from 'react';
import { useEffect }    from 'react';
import { useNavigate }  from 'react-router-dom';
import { format }       from 'date-fns';
import { getOrders }    from '~/services/ordersService.js';
import ServerError      from '~/shared/server-error/ServerError.jsx';
import Loading          from '~/shared/loading/Loading.jsx';

export default function Orders() {
  const [orders, setOrders] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(res => setOrders(res))
      .catch(_ => setError(true))
      .finally(_ => setLoading(false))
  }, []);

  if (error) return <ServerError />;
  if (loading) return <Loading />;
  if (orders.length === 0) return (
    <div className="container">
      <p>Няма поръчки.</p>
    </div>
  );

  return (
    <div className="container">
      <h2 className="mb-3"> Поръчки </h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col"> # </th>
            <th scope="col"> Телефон </th>
            <th scope="col"> Стойност </th>
            <th scope="col"> Създадена </th>
            <th scope="col"> Статус </th>
          </tr>
        </thead>
        <tbody>
          <TableRows orders={orders} />
        </tbody>
      </table>
    </div>
  );
}

function TableRows({ orders }) {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'orange';
      case 'Sent': return 'blue';
      case 'Completed': return 'green';
      case 'Cancelled': return 'red';
      default: return 'inherit';
    }
  };

  const formatDate = (iso) => {
    return format(new Date(iso), 'dd MMM yyyy HH:mm');
  };

  return orders.map((order, i) => (
    <tr key={order.id} onClick={() => navigate(`/admin/orders/update/${order.id}`)}>
      <th scope="row">{i + 1}</th>
      <td>{order.tel}</td>
      <td>{order.totalPrice.toFixed(2)} лв</td>
      <td>{formatDate(order.createdAt)}</td>
      <td style={{color: getStatusColor(order.status)}}>{order.status}</td>
    </tr>
  ));
}