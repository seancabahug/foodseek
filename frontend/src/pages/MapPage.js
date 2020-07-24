import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, CircleMarker, Circle } from 'react-leaflet';
import PersonCard from '../components/PersonCard';
import APIUtil from '../utils/apiutil';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Slide } from '@material-ui/core';

class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 39.8283,
            lng: -98.5795,
            zoom: 5,
            locations: [],
            currentPerson: null,
            currentLocation: null,
            cardVisible: false
        }
    }

    getLocationsFromPosition(location) {
        /* APIUtil.getLocationsFromPosition({latitude: location[0], longitude: location[1]}, (code, data) => {
            if(code){
                this.setState({locations: data});
            }
        }) */
        APIUtil.getAllLocations((code, data) => {
            if(code){
                this.setState({locations: data});
            }
        })
    }

    setCurrent(userId, location) {
        APIUtil.getUserInformation(userId, (code, data) => {
            if(code){
                this.setState({currentPerson: data, currentLocation: location});
                this.setState({cardVisible: true}); // yes, this should be in its own setstate
            }
        });
    }

    componentWillMount() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                this.setState({lat: pos.coords.latitude, lng: pos.coords.longitude, zoom: 10});
                this.getLocationsFromPosition([this.state.lat, this.state.lng]);
            });
        } else {
            this.getLocationsFromPosition([this.state.lat, this.state.lng]);
        }
    }

    render() {
        console.log("hello this is render");
        const position = [this.state.lat, this.state.lng];
        return (
            <div style={{width: "100%", height: "100%"}} >
                {this.state.currentPerson ? <PersonCard person={this.state.currentPerson} location={this.state.currentLocation} /> : <></>}
                <Map center={position} zoom={this.state.zoom} style={{width: "100%", height: "100%"}} minZoom={4} onmouseup={event => {/* this.getLocationsFromPosition([event.latlng.lat, event.latlng.lng]); */ console.log(event.latlng)}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {this.state.locations ? (
                        this.state.locations.map(location => (
                            <Marker key={location.userId} position={[location.location.latitude, location.location.longitude]} icon={L.icon({iconUrl: "/assets/pictures/marker.webp", iconSize: [50, 50], iconAnchor: [25, 50]})} onclick={() => this.setCurrent(location.userId, location)}>
                            </Marker>
                        ))
                    ) : (
                        ""
                    )}
                </Map>
            </div>
        )
    }
}


export default MapPage;