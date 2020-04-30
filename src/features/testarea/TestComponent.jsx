import React, { Component } from 'react'
import { connect } from 'react-redux';
import {incrementCounter, decrementCounter} from './testAction';
import { Button } from 'semantic-ui-react';
import TestPlaceInput from './TestPlaceInput';
import SimpleMap from './SimpleMap';
import {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

const mapStateToProps = (state)=>({
    data: state.data
})


const actions={
    incrementCounter,
    decrementCounter
}

class TestComponent extends Component {
    state={
        latlng:{
            lat: 59.95,
            lng: 30.33
        }
    }



    handleSelect=address =>{
        geocodeByAddress(address)
        .then(results=>getLatLng(results[0]))
        .then(latLng=>{
            this.setState({
                latlng:latLng
            })
        })
    }




    render() {
        const {incrementCounter,decrementCounter } = this.props;
        return (
            <div>
                <h1>Test Component </h1> 
        <h3>The answer is {this.props.data}</h3>
        <Button onClick={incrementCounter} positive content='Increment'></Button>
        <Button onClick={decrementCounter} negative content='Decrement'></Button>
        <br/>
        <br/>
        <TestPlaceInput selectAddress={this.handleSelect}/>
        <SimpleMap  latlng={this.state.latlng}  key={this.state.latlng.lng}/>

            </div>
        )
    }
}

 
export default  connect(mapStateToProps, actions)(TestComponent);
