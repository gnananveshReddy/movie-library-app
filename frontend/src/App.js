import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import axios from 'axios';
import MovieLists from './components/MovieLists';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import MovieSearch from './components/MovieSearch';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [token, setToken] = useState(null);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState('');

  useEffect(() => {
    const fetchLists = async () => {
      if (token) {
        try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/movielists`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setLists(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchLists();
  }, [token]);

  const addMovieToList = async (movieId) => {
    if (!selectedList) {
      alert('Please select a list');
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/movielists/${selectedList}/movies`,
        { movieId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Movie added to the list');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          {!token && (
            <>
              <Route path="/signin" element={<SignIn setToken={setToken} />} />
              <Route path="/signup" element={<SignUp setToken={setToken} />} />
              <Route path="/" element={<SignUp setToken={setToken} />} />
            </>
          )}
          {token && (
            <>
              <Route
                path="/"
                element={
                  <div>
                    <div className="mb-3">
                      <label htmlFor="lists" className="form-label">
                        Select a list:
                      </label>
                      <select
                        id="lists"
                        className="form-select"
                        value={selectedList}
                        onChange={(e) => setSelectedList(e.target.value)}
                      >
                        <option value="">--Select a list--</option>
                        {lists.map((list) => (
                          <option key={list._id} value={list._id}>
                            {list.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <MovieSearch token={token} addMovieToList={addMovieToList} />
                    <MovieLists token={token} />
                  </div>
                }
              />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;