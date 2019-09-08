import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import URLInputPage from './pages/URLInput.jsx';
import RedirectPage from './pages/Redirect.jsx';
import AdminPage from './pages/Admin.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </header>

        <Route path="/s/:shortId" render={({match}) => {
          const url = window.localStorage.getItem(match.params.shortId);
          return <RedirectPage url={url} />
        }} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/" exact component={URLInputPage} />
      </Router>
    </div>
  );
}

export default App;
