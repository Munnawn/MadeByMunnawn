// App.js

// BrowserRouter stores the current location in the browser's address
// Routes wraps individual routes
// Route creates a single route
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages and components
import HomePage from './pages/HomePage';
import SongPage from './pages/SongPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<HomePage />}
            />
            <Route
              path='/enter'
              element={<SongPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
