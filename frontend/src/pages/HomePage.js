import React from 'react';

import './HomePage.css';

class HomePage extends React.Component {

    constructor (props) {
        super(props)
    }

    render () {

        return (
            <>
                <section className="top">
                    <video autoPlay muted loop style={{height: "100%", width: "100%"}}>
                        <source src="/assets/videos/homebackground.mp4" type="video/mp4"/> 
                    </video>
                        <image src="/assets/overlay.png" z-index="11" className="Overlay" />
                    <div className="topText">
                        <h1 className="header1">We know life can be hard</h1>
                        <h1 className="header2">WE'RE HERE FOR YOU.</h1>
                    </div>
                </section>
                
                <section className="2ndToMain">
                    
                </section>
            </>
        )
    }
}

export default HomePage;