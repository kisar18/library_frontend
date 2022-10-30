import React, { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import axios from '../axios';


function Books() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/library/books');

      setBooks(req.data);
    }

    fetchData();
  }, []);

  return (
    <Box sx={{
      display:"flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <List sx={{ width: "75%" }}>
        {books.map((book) => (
          <ListItem key={book.name} sx={{ borderBottom: "2px solid grey"}}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={book.name + " " + book.publication_year}
            secondary={book.author}
            />
        </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Books;
