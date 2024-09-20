import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { PublicRoutes } from './routes/PublicRoutes';
import { AppLayout } from './layouts/AppLayout';

function App() {
  return (
    <PublicRoutes />
  )
}

export default App
