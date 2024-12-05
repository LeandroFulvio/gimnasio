import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomeRecord from './HomeRecord'
// import EditRecord from './EditRecord';
import Home from './Home';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Definir rutas para las pantallas */}
          {/* <Route exact path="/" element={<HomeRecord />} />
          <Route path="/edit/:id" element={<EditRecord />} /> */
          <Route path="/" element={<Home />} />
          }
        </Routes>
      </div>
    </Router>  
  )
}

export default App
