import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useCreateBook } from "../hooks/useCreateBook";

function CreateBookForm() {

  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [pages, setPages] = useState('');
  const [image, setImage] = useState('https://covers.openlibrary.org/b/isbn/<ISBN_HERE>-S.jpg');
  const [quantity, setQuantity] = useState('');

  const { createBook, error, isLoading } = useCreateBook();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createBook(name, author, publicationYear, pages, image, quantity);
  };

  return (
    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
      <form style={{ width: "75%" }} onSubmit={handleSubmit}>
        <h1>Create new book</h1>
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
          <Button disabled={isLoading} type='submit' variant="contained" size="large">Add book</Button>
        </Box>
      </form>
    </Box>
  );
}

export default CreateBookForm;
