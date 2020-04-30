import React from "react";
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import {connect} from 'react-redux';


const mapState=(state, ownProps)=>{
    const eventId = ownProps.match.params.id;

    let event ={};

    // filter out the event we needed
    if(eventId && state.events.length>0){
        event =state.events.filter(event=>event.id===eventId)[0]
    }

    return {
        event
    }
}



const EventDetailedPage = ({event}) => {
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader event={event} />
          <EventDetailedInfo event={event}/>
          <EventDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={event.attendees}/>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default connect(mapState)(EventDetailedPage);
