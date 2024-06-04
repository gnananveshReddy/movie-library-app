import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, ListGroup, Alert } from 'react-bootstrap';

const MovieLists = ({ token }) => {
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/movielists`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLists(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch movie lists.');
      }
    };

    fetchLists();
  }, [token]);

  const createList = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/movielists`,
        { name: listName, isPublic },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLists([...lists, res.data]);
      setListName('');
      setIsPublic(false);
    } catch (err) {
      console.error(err);
      setError('Failed to create movie list.');
    }
  };

  return (
    <div>
      <Form onSubmit={createList} className="mb-3">
        <Form.Group controlId="listName">
          <Form.Label>List Name</Form.Label>
          <Form.Control
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list name"
          />
        </Form.Group>
        <Form.Group controlId="isPublic" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Public"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </Form.Group>
        <Button type="submit">Create List</Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      <h3>Your Lists</h3>
      <ListGroup>
        {lists.map((list) => (
          <ListGroup.Item key={list._id}>{list.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default MovieLists;


// const MovieLists = ({ setCurrentList }) => {
//     const [lists, setLists] = useState([]);
//     const [listName, setListName] = useState('');
//     const [isPublic, setIsPublic] = useState(false);
//     const [error, setError] = useState(null);
  
//     const createList = (e) => {
//       e.preventDefault();
//       setError(null); // Reset error state
  
//       if (!listName) {
//         setError('List name cannot be empty.');
//         return;
//       }
  
//       const newList = {
//         id: lists.length + 1,
//         name: listName,
//         isPublic,
//         movies: []
//       };
  
//       setLists([...lists, newList]);
//       setListName('');
//       setIsPublic(false);
//     };
  
//     return (
//       <div>
//         <Form onSubmit={createList} className="mb-3">
//           <Form.Group controlId="listName">
//             <Form.Label>List Name</Form.Label>
//             <Form.Control
//               type="text"
//               value={listName}
//               onChange={(e) => setListName(e.target.value)}
//               placeholder="Enter list name"
//             />
//           </Form.Group>
//           <Form.Group controlId="isPublic" className="mb-3">
//             <Form.Check
//               type="checkbox"
//               label="Public"
//               checked={isPublic}
//               onChange={(e) => setIsPublic(e.target.checked)}
//             />
//           </Form.Group>
//           <Button type="submit">Create List</Button>
//         </Form>
//         {error && <Alert variant="danger">{error}</Alert>}
//         <h3>Your Lists</h3>
//         <ListGroup>
//           {lists.map((list) => (
//             <ListGroup.Item key={list.id} onClick={() => setCurrentList(list)}>
//               {list.name}
//             </ListGroup.Item>
//           ))}
//         </ListGroup>
//       </div>
//     );
//   };
  
//   export default MovieLists;
