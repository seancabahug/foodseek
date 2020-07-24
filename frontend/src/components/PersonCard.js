import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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

const styles = theme => ({
  root: {
    width: "28%",
    zIndex: 401,
    position: "absolute",
    right: "-100%", // 3%,
    transition: theme.transitions.create('right', {
      duration: theme.transitions.duration.shortest
    }),
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
  cardVisible: {
    right: "3%"
  }
});

class PersonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    console.log("comp mount")
    this.setState({visible: true})
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={clsx(classes.root, {
        [classes.cardVisible]: this.state.visible
      })}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
            </Avatar>
          }
          title={this.props.person.realName}
          subheader={this.props.person.isFoodProvider ? "Volunteer" : "Hero"}
        />
        <CardContent>
          <Typography variant="h5" color="textSecondary" component="h1" style={{marginBottom: "15px"}}>
            Location Details
          </Typography>
          <Typography variant="body1" style={{lineHeight: "30px"}} >
            {this.props.location.description}
          </Typography> 
        </CardContent>
        <CardActions disableSpacing>
          <IconButton variant="contained" color="primary">
            <ChatIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(PersonCard);