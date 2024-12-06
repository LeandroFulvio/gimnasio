import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';

function App() {

  return (
    <Router>
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  </Router>
  )
}

export default App
