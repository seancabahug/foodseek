import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import socket from '../utils/socket';
import { withRouter, Link } from 'react-router-dom';
import { Switch, Route } from 'react-router';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

class MessagingPage extends React.Component {
    constructor(props){
        super(props);
        this.client = socket();

      }

    componentWillMount() {

    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(MessagingPage));