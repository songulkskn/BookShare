import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './styles/Card.css'
import {UserContext} from '../UserContext';
import { api } from './axios';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const {user, setUser} = useContext(UserContext);
  const [isLiked, setLike] = useState(false);
  const [realTimeLike, setRealTimeLike] = useState(false);



  const handleLike = (e) => {
    e.preventDefault();
    api.put('/Book/LikeBook', {BookID: props.bookID, UserID: user.userID, Header: props.header, Comment: props.comment, Name: props.name, Likes: props.likes}).then(res=>{
        console.log(res.data);
        if(res.data.isSuccess) {
            props.isLiked();
            
        }
    })
    setLike(!isLiked);
  }

  return (
    <div className="Card">
    <Card className={classes.root}>
      <CardHeader
        
        action={
          <IconButton aria-label="settings">
            
          </IconButton>
        }
        title={props.name}
        subheader={props.header}
      />
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.comment}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <strong>{props.likes}</strong>
        {user ?
            <IconButton aria-label="add to favorites">
               {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon  onClick={handleLike}/> }
            </IconButton> : ''
        }

      </CardActions>
     
    </Card>
    </div>
  );
}
