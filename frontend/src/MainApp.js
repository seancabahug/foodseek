import React from 'react';
import APIUtil from './utils/apiutil';
import MapIcon from '@material-ui/icons/Map'; 
import ChatIcon from '@material-ui/icons/Chat';
import MenuIcon from '@material-ui/icons/Menu';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button
} from "@material-ui/core";
import { withRouter, Link } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import MapPage from './pages/MapPage';
import MessagingPage from './pages/MessagingPage';

class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
    }

    render() {
        return (
            <div style={{flexGrow: 1, width: "100%", height: "100%"}}>
                <Drawer
                    anchor="left"
                    open={this.state.drawerOpen}
                    onClose={() => {this.setState({drawerOpen: false})}}
                >
                    <div
                        style={{width: 300}}
                        onClick={() => {this.setState({drawerOpen: false})}}
                        onKeyDown={() => {this.setState({drawerOpen: false})}}
                    >
                        <List>
                            <Link to={`${this.props.match.url}`} style={{textDecoration: "none", color: "black"}}>
                                <ListItem button key="Map">
                                    <ListItemIcon><MapIcon /></ListItemIcon>
                                    <ListItemText primary="Map" />
                                </ListItem>
                            </Link>
                            <Link to={`${this.props.match.url}/chat`} style={{textDecoration: "none", color: "black"}}>
                                <ListItem button key="Messaging">
                                    <ListItemIcon><ChatIcon /></ListItemIcon>
                                    <ListItemText primary="Messaging" />
                                </ListItem>
                            </Link>
                        </List>
                    </div>
                </Drawer>
                <AppBar position="sticky" style={{zIndex: 402}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => {this.setState({drawerOpen: true})}}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            FoodSeek
                        </Typography>
                        <Button onClick={() => {
                            APIUtil.logout(() => {
                                this.props.history.push("/");
                            });
                        }} color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route exact path={this.props.match.path}>
                        <MapPage />
                    </Route>
                    <Route path={`${this.props.match.path}/chat`}>
                        <MessagingPage />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default withRouter(MainApp);