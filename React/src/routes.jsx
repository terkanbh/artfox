import { Route }      from 'react-router-dom';

import Index          from './pages/public/index/Index.jsx';
import Artworks       from './pages/public/artworks/Artworks.jsx';
import ArtworkDetails from './pages/public/artwork-details/ArtworkDetails.jsx';
import Order          from './pages/public/order/Order.jsx';
import Contacts       from './pages/public/contacts/Contacts.jsx';
import Login          from './pages/public/login/Login.jsx';
import NotFound       from './pages/public/not-found/NotFound.jsx';
import AdminLayout    from './shared/admin-layout/AdminLayout.jsx';
import ArtworksAdmin  from './pages/admin/artworks/Artworks.jsx';
import CreateArtwork  from './pages/admin/create-artwork/CreateArtwork.jsx';
import UpdateArtwork  from './pages/admin/update-artwork/UpdateArtwork.jsx';
import OrdersAdmin    from './pages/admin/orders/Orders.jsx';
import UpdateOrder    from './pages/admin/update-order/UpdateOrder.jsx';

const routes = (<>
  <Route path='' element={<Index />} />
  <Route path='artworks' element={<Artworks />} />
  <Route path='artworks/:id' element={<ArtworkDetails />} />
  <Route path='contacts' element={<Contacts />} />
  <Route path='order' element={<Order />} />
  <Route path='login' element={<Login />} />
  <Route path='admin/*' element={<AdminLayout />}>
    <Route path='' element={<OrdersAdmin />} />
    <Route path='artworks' element={<ArtworksAdmin />} />
    <Route path='artworks/create' element={<CreateArtwork />} />
    <Route path='artworks/update/:id' element={<UpdateArtwork />} />
    <Route path='orders' element={<OrdersAdmin />} />
    <Route path='orders/update' element={<UpdateOrder />} />
  </Route>
  <Route path='*' element={<NotFound />} />
</>);

export default routes;