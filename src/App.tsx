import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthorMainPage } from './components/author/AuthorMainPage';
import { BookMainPage } from './components/book/BookMainPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/books' element={<BookMainPage />} />
          <Route path='/authors' element={<AuthorMainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
