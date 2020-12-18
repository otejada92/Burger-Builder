import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from "react-router-dom";

const authenticatedRouter = (props) => {
    if(props.isAuthenticated){
        return (<Route {...props} />)
    }
    return <Redirect to="/"/>;
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(authenticatedRouter);