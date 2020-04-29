import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from "cuid";

// static data
const eventsFromDashboard = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-27",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      },
    ],
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
    ],
  },
];

class EventDashboard extends Component {
  state = {
    events: eventsFromDashboard,
    isOpen: false,
    selectedEvent: null,
  };

  // toggle
  // handleIsOpenToggle=()=>{
  //     this.setState(({isOpen})=>({
  //       isOpen: !isOpen
  //     }))
  // }

  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null,
    });
  };

  handleFormCancel = () => {
    this.setState({
      isOpen: false,
    });
  };


  // handle a create event need pass the new event
  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    // destructure events from state, this is previous state
    this.setState(({ events }) => ({
      events: [...events, newEvent],
      isOpen: false,
    }));
  };

  // happened when user click on view button
  handleSelectEvent = (event) => {
    this.setState({
      selectedEvent: event,
      isOpen: true,
    });
  };

  handleDeleteEvent = (id)=>{
    this.setState(({events})=>({
      events: events.filter(e=>e.id !==id)
    }))
  }

  // update event  pass this event to EventForm where submitting
  handleUpdateEvent = (updatedEvent) => {
    this.setState(({ events }) => ({
      events: events.map((event) => {
        // if eventId is equal to updatedId   udate
        if (event.id === updatedEvent.id) {
          return { ...updatedEvent };
        } else {
          // else return event itself
          return event;
        }
      }),
      isOpen: false,
      selectedEvent: null
    }));
  };

  render() {
    const { events, isOpen, selectedEvent } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} 
          selectEvent={this.handleSelectEvent}  
          deleteEvent={this.handleDeleteEvent}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            positive
            content='Create Event'
            onClick={this.handleCreateFormOpen}
          />
          {/* isOpen true display */}
          {isOpen && (
            <EventForm
              key={selectedEvent ? selectedEvent.id : 0}
              selectedEvent={selectedEvent}
              createEvent={this.handleCreateEvent}
              cancelFormOpen={this.handleFormCancel}
              updateEvent={this.handleUpdateEvent}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
