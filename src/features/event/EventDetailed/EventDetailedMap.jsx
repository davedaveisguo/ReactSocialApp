import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";


const Marker = () => <Icon name="marker" size="big"  color="red"/>;

const EventDetailedMap = ({ lat, lng }) => {
  const zoom = 14;
  return (
    //   padding 0 then map take whole segment
    <Segment attached='bottom'  style={{padding: 0}}>
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyANDifgXVx_shct7JjHpT4UKdEpTnxAdFM" }}
          defaultCenter={{lat, lng}}
          defaultZoom={zoom}
        >
          <Marker 
          lat={lat} 
          lng={lng} 
          />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailedMap;
