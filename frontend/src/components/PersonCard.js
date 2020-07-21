import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {blue, green, orange, yellow, pink, gray, red, cyan} from '@material-ui/core/colors';
import ChatIcon from '@material-ui/icons/Chat';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "28%",
    zIndex: 401,
    position: "absolute",
    right: "3%",
    top: "55%",
    transform: "translateY(-50%)",
    backgroundColor: "white",
    boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
    padding: "10px"
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
    backgroundColor: blue[600],
    width: "100px",
    height: "100px",
  },
}));

export default function PersonCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
          </Avatar>
        }
        //action={
          // <IconButton aria-label="settings">
          //   <MoreVertIcon />
          // </IconButton>
        //}
         title="Jack"
         subheader="Province, City, State"
      />
      {/* <CardMedia
        className={classes.media}
        //image="https://cdn.discordapp.com/avatars/214479592000323584/0fbab8b2fe9b9d6964b7e9b026c8759c.png"
        title="nose"
        
      /> */}
      <CardContent>
        <Typography variant="h5" color="textSecondary" component="h1" style={{marginBottom: "15px"}}>
          About Me
        </Typography>
        <Typography variant="body1" style={{lineHeight: "30px"}} >
          Quis commodo consectetur irure pariatur culpa elit deserunt deserunt ea incididunt. 
          Lorem Ipsum this is some text. Quis commodo consectetur irure pariatur culpa elit deserunt deserunt ea incididunt. 
          Lorem Ipsum this is some text. Quis commodo consectetur irure pariatur culpa elit deserunt deserunt ea incididunt. 
          Lorem Ipsum this is some text
        </Typography> 
      </CardContent>
      <CardActions disableSpacing>
        {/* <Button aria-label="Message" color="primary" variant="contained" style={{marginLeft: "5px"}}>
          Message
        </Button> */}
        <IconButton variant="contained" color="primary">
          <ChatIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}