import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { PublicRoutes } from './routes/PublicRoutes';
import { AppLayout } from './layouts/AppLayout';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <PublicRoutes />
    </AuthProvider>
  )
}

export default App