import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const MovieSearch = ({ token, addMovieToList }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    if (!query) {
      setError('Please enter a movie title.');
      return;
    }

    try {
      const res = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`);
      if (res.data.Response === "True") {
        setResults(res.data.Search || []);
      } else {
        setResults([]);
        setError(res.data.Error);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch movies. Please try again later.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2>Search Movies</h2>
          <Form onSubmit={handleSearch} className="mb-3">
            <Form.Group controlId="searchQuery">
              <Form.Label>Search Movies</Form.Label>
              <Form.Control
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter movie title"
              />
            </Form.Group>
            <Button type="submit">Search</Button>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
          <div>
            {results.map((movie) => (
              <div key={movie.imdbID} className="mb-3">
                <h5>{movie.Title} ({movie.Year})</h5>
                <img src={movie.Poster} alt={`${movie.Title} poster`} style={{ width: '100px' }} />
                <Button onClick={() => addMovieToList(movie.imdbID)}>Add to List</Button>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieSearch;
