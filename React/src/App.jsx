import { Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import { CartProvider } from './contexts/CartProvider.jsx';
import { EcontProvider } from './contexts/EcontProvider.jsx';
import Navbar from './shared/navbar/Navbar.jsx';
import routes from './routes.jsx';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <EcontProvider>
          <Navbar />
          <Routes> {routes} </Routes>
          <Toaster position='bottom-center' />
        </EcontProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;