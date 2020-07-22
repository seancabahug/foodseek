import React from 'react';
import { Button } from '@material-ui/core';

import './HomePage.css';

class HomePage extends React.Component {
    constructor (props) {
        super(props)
    }

    preloadImage(url) {
        var img = new Image();
        img.src = url;
    }

    render () {
        return (
            <>
                <section className="topPage">
                    <video autoPlay muted loop z-index="10" className="BackgroundVid" height={"100%"} width={"100%"}>
                        <source src="/assets/videos/homebackground.mp4" type="video/mp4"/> 
                    </video>
                        <img src="/assets/overlay.png" z-index="11" className="Overlay" style={{height: "109%", width: "100%"}}/>
                        <div id="headerContainer">
                            <h1 className="header1">We know life can be hard.</h1>
                            <h1 className="header2">WE'RE HERE FOR YOU.</h1>
                        </div>
                </section>
                
                <section className="Intro">
                    <div style={{zIndex: 15}}>
                        <img src="/assets/pictures/Firstimage.png" style={{width:"100%"}, {position:"static"}} className="1stImg" />
                        <h2 z-index="16">Food is one of the most essential needs</h2>
                        <h3 >it's like water or air</h3>
                        <h5>But still, millions of people do not have reliable access to food</h5>
                    </div>
                </section>

                <section className="Unemployment">
                    <div className="unemployment">
                        <div className="image">
                            <img src="/assets/pictures/secondImg.png" />
                        </div>
                        <div className="text">
                            <h5>Highest unemployment rate since the great depression</h5>
                            <h3>14.7% unemployment rate</h3>
                            <h1>20 million Americans unemployed</h1>
                        </div>
                    </div>
                </section>
                <section className="FoodInsecurity">
                    <div className="AdultInsecurity">
                        <img src="/assets/pictures/thirdImg.png" style={{width:"100%"}}/>
                        <div className="foodInsecurity">
                            <h3>11% of the US population does not have reliable access to food</h3>
                            <h2>37 million people are food insecure</h2>
                        </div>

                    </div>
                    <div className="children">
                        <img src="/assets/pictures/fourthImg.png" style={{width:"100%"}}/>
                        <h1>11 million children are food insecure</h1>
                        <h3>Children are the most likely age group to face food insecurity</h3>
                    </div>

                </section>
                <section className="CallToAction">
                    <h1 className="But">but...</h1>
                    <div className="Relief">
                        <img src="/assets/pictures/fifthImg.png" />
                        <h1 className="You">YOU</h1>
                        <h2 className="reliefText">can be their relief.</h2>
                        <h3 className="coffee">And it costs less than a cup of coffee</h3>
                    </div>
                    <div className="Fight">
                    <h1 className="JoinFight">Join the Fight</h1>
                    <div className="btn">
                    <Button className="signUpBtn"><h1 className="signUpText">Sign Up Now</h1></Button> 
                    </div>

                    </div>
                </section>
            </>
        )
    }
}

export default HomePage;