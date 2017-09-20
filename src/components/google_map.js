import React from 'react';
import Map, { GoogleApiWrapper } from 'google-maps-react';


// Reusable Component for presenting Google Map, takes the latitude and longitude
// as input parameters
class GoogleMap extends React.Component {
    render() {
        const lat = this.props.lat;
        const lng = this.props.lng;
        return (
            <Map style={mapSize}
                clickableIcons={false}
                google={this.props.google}
                zoom={14}
                center={{
                    lat: lat,
                    lng: lng
                }}
            />
        );
    }
}
// Export component and bind API_KEY to google map service
export default GoogleApiWrapper({
    apiKey: "AIzaSyBpRPyVR8qkYvPT6iCRwvbXe2-SMDaTFm8",
})(GoogleMap);

const mapSize = {
    height: 300, 
    width: 350
}