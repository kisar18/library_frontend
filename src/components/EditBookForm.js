import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuthContext } from '../hooks/useAuthContext';
import { useLocation } from 'react-router-dom';
import { useEditBook } from "../hooks/useEditBook";

function EditBookForm() {

  const location = useLocation();

  const [book, setBook] = useState({});

  const { editBook, error, isLoading } = useEditBook();

  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [pages, setPages] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState('');

  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8001/books/${location.state.bookId}`, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      setBook(json);
      setName(json.name);
      setAuthor(json.author);
      setPublicationYear(json.publication_year);
      setPages(json.pages);
      setImage(json.image);
      setQuantity(json.quantity);
    }

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await editBook(book._id, name, author, publicationYear, pages, image, quantity);
  };

  return (
    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
      <form style={{ width: "75%" }} onSubmit={handleSubmit}>
        <h1>Edit book</h1>
        <Box sx={{ mt: 3 }}>
          <TextField
            name="name"
            label="Name"
            value={name}
            onChange={e => { setName(e.target.value); }}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField
            name="author"
            label="Author"
            value={author}
            onChange={e => { setAuthor(e.target.value); }}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField
            name="publicationYear"
            label="Publication year"
            value={publicationYear}
            onChange={e => { setPublicationYear(e.target.value); }}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField
            name="pages"
            label="Pages"
            value={pages}
            onChange={e => { setPages(e.target.value); }}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField
            name="image"
            label="Image url"
            value={image}
            onChange={e => { setImage(e.target.value); }}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField
            name="quantity"
            label="Quantity"
            value={quantity}
            onChange={e => { setQuantity(e.target.value); }}
            required
            fullWidth
          />
        </Box>
        {error && <div className="error">{error}</div>}
        <Box sx={{ mt: 3 }}>
          <Button disabled={isLoading} type='submit' variant="contained" size="large">Edit</Button>
        </Box>
      </form>
    </Box>
  );
}

export default EditBookForm;
