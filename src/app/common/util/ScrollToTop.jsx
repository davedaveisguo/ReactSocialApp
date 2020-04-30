import {Component} from 'react';
import { withRouter } from "react-router-dom";




class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
      if (
        this.props.location.pathname !== prevProps.location.pathname
      ) {
        window.scrollTo(0, 0);
      }
    }
    // the App and children of App 
    render() {
      return this.props.children;
    }
  }
  

  export default withRouter(ScrollToTop);