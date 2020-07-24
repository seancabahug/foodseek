import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Socket from "../utils/socket";
import { withRouter, Link } from "react-router-dom";
import { Switch, Route } from "react-router";
import Chat from "../components/Chat";
import { CircularProgress } from "@material-ui/core";
import APIUtil from "../utils/apiutil";

const styles = (theme) => ({
	root: {
		width: "100%",
		height: "100%",
		maxWidth: "36ch",
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: "inline",
	},
});

class MessagingPage extends React.Component {
	constructor(props) {
		super(props);
		this.client = new Socket();
		this.state = {
			recentlyTalkedTo: ["Jeff", "Bob", "Kyle"],
		};
		this.registerMessageHandler = this.registerMessageHandler.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	registerMessageHandler(callback) {
		this.client.registerMessageHandler(callback);
	}

	sendMessage(message, recipientId) {
		this.client.sendMessage(message, recipientId);
	}

	componentWillMount() {
		/* APIUtil.getSelfInfo((code, data) => {
        if(code) {
          this.setState({recentlyTalkedTo: data.recentlyTalkedTo});
          console.log(this.state.recentlyTalkedTo);
        }
      }); */
	}

	addToRecentlyTalkedTo(userId) {
		this.setState({
			recentlyTalkedTo: this.state.recentlyTalkedTo.concat([userId]),
		});
	}

	render() {
		return (
			<Switch>
				<Route exact path={this.props.match.path}>
					<List>
						{this.state.recentlyTalkedTo.map((ele) => {
							return (<p>{ele}</p>);
						})}
					</List>
				</Route>
				<Route path={`${this.props.match.path}/:senderId`}>
					<Chat
						sendMessage={this.sendMessage}
						registerMessageHandler={this.registerMessageHandler}
						recentlyTalkedTo={this.state.recentlyTalkedTo}
						updateRecentlyTalkedTo={this.addToRecentlyTalkedTo}
					/>
				</Route>
			</Switch>
		);
	}
}

export default withRouter(withStyles(styles)(MessagingPage));
