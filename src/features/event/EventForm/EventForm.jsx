/*global google*/
import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
} from "revalidate";
import cuid from "cuid";
import TextInput from "../../../app/common/form/TextInput";
import { reduxForm, Field } from "redux-form";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

//  get events state from store
const mapStateToProps = (state, ownProps) => {
  // id here is from click Button `manage Event` event from eventDetailedHeader
  const eventId = ownProps.match.params.id;
  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter((event) => event.id === eventId)[0];
  }

  return {
    initialValues: event,
  };
};

const actions = {
  createEvent,
  updateEvent,
};

//  validate functions
const validate = combineValidators({
  // specify the field
  title: isRequired({ message: "The event title is required" }),
  category: isRequired({ message: "The category title is required " }),
  description: composeValidators(
    isRequired({ message: "Please enter description" }),
    hasLengthGreaterThan(4)({ message: "at least 5 characters" })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date"),
});

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

class EventForm extends Component {
  
  //declare state
  // state = {
  //   ...this.props.event,
    
  // };

  // this.state is event now

  // // here handle input change, then set the state, pass to createEvent
  // handleInputChange = ({ target: { name, value } }) => {
  //   this.setState({
  //     // title: event.target.value   before it is specific after change, it is generic
  //     [name]: value,
  //   });
  // };

  // if it is a selected event, there is id, we will use create action, otherwise, use create
  // handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   if (this.state.id) {
  //     this.props.updateEvent(this.state);
  //     this.props.history.push(`/events/${this.state.id}`);
  //   } else {
  //     const newEvent = {
  //       ...this.state,
  //       id: cuid(),
  //       hostPhotoURL: "/assets/user.png",
  //     };
  //     this.props.createEvent(newEvent);
  //     this.props.history.push(`/events`);
  //   }
  // };



  state={

    cityLatLng: {},
    venueLatLng: {}
  }






  convertObjDateToStringDate = (eventDate) => {
    let stringDate =
      eventDate.getFullYear() +
      "-" +
      (eventDate.getMonth() + 1) +
      "-" +
      eventDate.getDate() +
      " " +
      eventDate.getHours() +
      ":" +
      eventDate.getMinutes() 
      ;
    return stringDate;
  };

  onFormSubmit = (values) => {
    if (this.props.initialValues.id) {
      const newValues={
        ...values,
        date: this.convertObjDateToStringDate(values.date)
      }
      this.props.updateEvent(newValues);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      console.log(values.date);
      const newEvent = {
        ...values,
        date: this.convertObjDateToStringDate(values.date),
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob",
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  };





  handleCitySelect=selectedCity=>{
      geocodeByAddress(selectedCity)
      .then(results=>getLatLng(results[0]))
      .then(latlng=>{
        this.setState({
          cityLatLng: latlng
        })
      })
      .then(()=>{
        this.props.change('city', selectedCity)
      })
  }


  handleVenueSelect=selectedVenue=>{
    geocodeByAddress(selectedVenue)
    .then(results=>getLatLng(results[0]))
    .then(latlng=>{
      this.setState({
        venueLatLng: latlng
      })
    })
    .then(()=>{
      this.props.change('venue', selectedVenue)
    })
}

  render() {
    //  destructure from props   pristine refered to not touched
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine,
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details' />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete='off'
            >
              <Field
                name='title'
                component={TextInput}
                placeholder='event Title'
              />
              <Field
                name='category'
                component={SelectInput}
                placeholder='what is your event about'
                options={category}
              />
              <Field
                name='description'
                component={TextArea}
                placeholder='tell description'
                rows={5}
              />
              <Header sub color='teal' content='Event Location Details' />
              <Field
                name='city'
                component={PlaceInput}
                placeholder='event city'
                // narrow down to cities
                options={{types:['(cities)']}}
                onSelect={this.handleCitySelect}
              />
              <Field
                name='venue'
                component={PlaceInput}
                placeholder='event venue'
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ['establishment']
                }}
                onSelect={this.handleVenueSelect}
              />
              <Field
                name='date'
                component={DateInput}
                dateFormat='dd LLL yyyy hh:mm a'
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={15}
                timeCaption='time'
                placeholder='Event Date'
              />

              <Button
                positive
                type='submit'
                disabled={invalid || submitting || pristine}
              >
                Submit
              </Button>
              <Button
                type='button'
                onClick={
                  initialValues.id
                    ? () => history.push(`/events/${initialValues.id}`)
                    : () => history.push("/events")
                }
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(reduxForm({ form: "eventForm", validate })(EventForm));
