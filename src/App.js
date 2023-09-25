import { Route, Routes } from 'react-router-dom';
import Books from './Pages/Books';

import Add from './Pages/Add';
import Update from './Pages/Update';
import Home from './Pages/Home';

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={< Books />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
