import React from 'react';
import { Paper, Box, Button, TextField, Snackbar } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import './Login.css';
import APIUtil from '../utils/apiutil';

export default function Login() {
    let history = useHistory();

    const [usernameValue, setUsernameValue] = React.useState("");
    const [passwordValue, setPasswordValue] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [loginButtonText, setLoginButtonText] = React.useState("Log In");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway'){
            return;
        }
        setSnackbarOpen(false);
    };

    return(
        <div className="container">
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Error! {errorMessage}
                </Alert>
            </Snackbar>
            <Paper className="square" elevation={3} square>
                <div className="content">
                    <Box display="flex" style={{height: "100%"}} flexDirection="column" alignItems="center" justifyContent="center" className="box">
                        <h1>Login!</h1>
                        <div className="buttonContainer">
                            <TextField placeholder="Username" onChange={event => setUsernameValue(event.target.value)} />
                            <TextField placeholder="Password" type="password" onChange={event => setPasswordValue(event.target.value)} />
                            <br/>
                            <Button variant="contained" color="primary" onClick={() => {
                                setLoginButtonText("Logging in...");
                                APIUtil.authenticate({
                                    username: usernameValue,
                                    password: passwordValue
                                }, (status, error="") => {
                                    if (status) {
                                        history.push("/app");
                                    } else {
                                        setLoginButtonText("Log In");
                                        setErrorMessage(error);
                                        setSnackbarOpen(true);
                                    }
                                })
                            }}>{loginButtonText}</Button>
                            <Button color="secondary" onClick={() => {
                                history.push('/login')
                            }}>Don't have an account?</Button>
                        </div>
                    </Box>
                </div>
            </Paper>
        </div>
    )
}