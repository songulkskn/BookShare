
import React, {useState, useContext, useEffect} from 'react';
import {UserContext} from '../UserContext';
import {api} from '../components/axios';
import Card from '../components/Card';
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import '../components/styles/CreateBook.css';

function getModalStyle() {
    const top = 50 
    const left = 50 
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

 
function Home() {

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [openBook, setOpenBook] = useState(false);
    const [books, setBooks] = useState([])
    const [BookHeader, setBookHeader] = useState('');
    const [BookContent, setBookContent] = useState('');
    const {user, setUser} = useContext(UserContext);
    const [realTime, setRealTime] = useState(false);
    
    useEffect(() => {
        api.get(`/Book`).then(res => {
            setBooks(res.data);
           
          });
      }, []);

      useEffect(() => {
        api.get(`/Book`).then(res => {
            setBooks(res.data);
          });
      }, [realTime]);



      console.log(books)
    const createBook = (event) => {
        event.preventDefault();
        api.post('/Book/CreateBook', {UserID: user.userID, Header: BookHeader, Comment:BookContent, Name:user.name}).then(res=>{
            console.log(res.data)
            if(res.data.isSuccess) {
                setRealTime(!realTime);
                setOpenBook(false);
                alert("successfully created")
                
                
                
            }else {
                alert("something went wrong !! ")
            }
        });
    }
    const isLiked = () => {
    
        setRealTime(!realTime);
      }
    console.log(user);
      return (
        <div>
        <Modal open={openBook} onClose={() => setOpenBook(false)}>
            <div style={modalStyle} className={classes.paper}>
            <form className="CreateBook">
                <center>
            
                </center>
                <Input
                type="text"
                placeholder="BookHeader"
                value={BookHeader}
                onChange={(e) => setBookHeader(e.target.value)}
                />
                <Input
                type="text"
                placeholder="BookContent"
                value={BookContent}
                onChange={(e) => setBookContent(e.target.value)}
                />

                <Button  variant="contained" type="submit" onClick={createBook}>
                CreateBook
                </Button>
            </form>
            </div>
        </Modal>
            <h3>{user ? 'welcome' + ' ' + user.name: ''}</h3>
            
            <Button  className="app__createPost" variant="contained" color="primary" onClick={() => setOpenBook(true)}>CreateBook</Button>
            
            {
                books.map(book => (
                    <Card
                    bookID = {book.bookID}
                    name = {book.name}
                    header = {book.header}
                    comment = {book.comment}
                    likes = {book.likes}
                    isLiked = {isLiked}
                    />
                ))
            }
            
            
        </div>
    );
}
export default Home;