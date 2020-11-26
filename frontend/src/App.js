import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import './components/styles/style.css';
import { Container, Login, Register } from './components';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  useEffect(() => {
    setUser(localStorage.getItem('user'));
    console.log(localStorage.getItem('token'));
  }, [])
  return (
    <div className="App">
      <Router>
        {
          token || localStorage.getItem('token') ?
            <>
              <Redirect to='/' />
              <Route exact path="/">
                <Container user={user} setToken={setToken} />
              </Route>
            </>
            :
            <>
              <Redirect to='/login' />
              <Route path="/login">
                <Login setUser={setUser} setToken={setToken} />
              </Route>
              <Route path="/register">
                <Register setUser={setUser} setToken={setToken} />
              </Route>
            </>
        }
      </Router>

    </div>
  );
}

export default App;
