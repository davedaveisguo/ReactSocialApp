import React, {Component, Fragment} from 'react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import {PeopleDashboard} from '../../features/user/PeopleDashboard/PeopleDashboard';
import EventForm from '../../features/event/EventForm/EventForm';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';



class App extends Component {
  render(){
  return (
    <Fragment>
      {/* .+ means any letter appear once or more */}
      <Route exact path='/'  component={HomePage}  />
      <Route 
      path='/(.+)'  
      render={()=>(
        <Fragment>
          {/* history is a Route object, but how do we get it for NavBar --- it is not wrapped in Route? */}
          {/* use 'withRouter' */}
        <NavBar/>
        <Container className="main">
          <Route path='/events'  component={EventDashboard}  />
          <Route path='/events/:id'  component={EventDetailedPage}  />
          <Route path='/people'  component={PeopleDashboard}  />
          <Route path='/profile/:id'  component={EventDashboard}  />
          <Route path='/settings'  component={SettingsDashboard}  />
          <Route path='/createEvent'  component={EventForm}  />
        </Container>
        </Fragment>
      )}
      />
    </Fragment>
   
  );
  }
}

export default App;


