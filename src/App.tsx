import { RouterProvider } from 'react-router-dom';
import { publicRouter } from './routes';

function App() {
  return (
    <div className="App">
      <RouterProvider router={publicRouter} />
    </div>
  );
}

export default App;
