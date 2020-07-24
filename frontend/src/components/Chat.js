import React from "react";
import {
	List,
	TextField,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";
import { withRouter } from 'react-router-dom';

class Chat extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            chatHistory: []
        };
        this.handleKey = this.handleKey.bind(this);
        this.onReceiveMessage = this.onReceiveMessage.bind(this);
	}

    handleKey(event) {
        if(event.key == "Enter") {
            console.log(this.state.userInput);
            if(this.state.userInput){
                this.props.sendMessage(this.state.userInput, this.props.match.params.senderId);
            }
        }
    }

    onReceiveMessage(message) {
        this.setState({chatHistory: this.state.chatHistory.concat([message])})
    }

    componentWillMount() {
        this.props.registerMessageHandler(this.onReceiveMessage);
        if(this.props.recentlyTalkedTo.includes(this.props.match.params.senderId)) {
            this.props.updateRecentlyTalkedTo(this.props.match.params.senderId);
            console.log(this.props);
        }
    }

	render() {
		return (
			<div className="chatContainer">
				<List>
                    {this.state.chatHistory.map(message => (
                        <ListItem>
                            <ListItemText primary={message.senderName} secondary={message.message} />
                        </ListItem>
                    ))}
				</List>
                <TextField id="messageInput" label="Enter a message" placeholder="Message:" onKeyPress={this.handleKey} value={this.state.userInput} onChange={event => this.setState({userInput: event.target.value})}/>
			</div>
		);
	}
}

export default withRouter(Chat);
