import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";

class EventForm extends Component {
  //declare state
  state = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: "",
  };

  componentDidMount() {
    //  check if there is selected events
    if (this.props.selectedEvent !== null) {
      this.setState({
        ...this.props.selectedEvent,
      });
    }
  }
  // if it is a selected event, there is id, we will use create action, otherwise, use create
  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.id) {
      this.props.updateEvent(this.state);
    }else{
    this.props.createEvent(this.state);
    }
  };

  // here handle input change, then set the state, pass to createEvent 
  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      // title: event.target.value   before it is specific after change, it is generic
      [name]: value,
    });
  };

  render() {
    const { cancelFormOpen } = this.props;
    // extract title from state
    const { title, date, city, venue, hostedBy } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit} autoComplete='off'>
          <Form.Field>
            <label>Event Title</label>
            <input
              name='title'
              placeholder='Event Title'
              value={title}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              type='date'
              name='date'
              placeholder='Event date'
              value={date}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name='city'
              value={city}
              onChange={this.handleInputChange}
              placeholder='City event is taking place'
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              placeholder='Enter the Venue of the event'
              name='venue'
              value={venue}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              placeholder='Enter the name of person hosting'
              name='hostedBy'
              value={hostedBy}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Button positive type='submit'>
            Submit
          </Button>
          <Button type='button' onClick={cancelFormOpen}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default EventForm;
