import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import PersonCard from '../components/PersonCard';
import 'leaflet/dist/leaflet.css';

class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 39.8283,
            lng: -98.5795,
            zoom: 5,
            events: []
        }
    }

    componentDidMount() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                this.setState({lat: pos.coords.latitude, lng: pos.coords.longitude, zoom: 10});
            });
        }
    }

    render() {
        console.log("hello this is render");
        const position = [this.state.lat, this.state.lng];

        return (
            <div style={{width: "100%", height: "100%"}}>
                <PersonCard />
                <Map center={position} zoom={this.state.zoom} style={{width: "100%", height: "100%"}} minZoom={4}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={position}>
                        <Popup>A pretty CSS3 popup.<br /> Easily customizable.</Popup>
                    </Marker>
                </Map>
            </div>
        )
        
    }
}


export default MapPage;