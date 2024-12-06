import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './components/Navbar';
import Home from './Home';
import CreateClass from './components/CreateClass';
import ClassList from './components/ClassList';

function App() {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const handleClassCreated = () => {
    setUpdateTrigger(prev => prev + 1);
  };

  return (
    <Router>
      <div className="container-fluid">
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clases" element={
              <>
                <CreateClass onClassCreated={handleClassCreated} />
                <ClassList trigger={updateTrigger} />
              </>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
