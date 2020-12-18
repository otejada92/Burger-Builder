import React, { Component } from 'react'
import Aux from '../_Aux/_Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/ToolBar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    sideDrawerCloseHandler = () =>{
        this.setState({showSideDrawer : false})
    }

    sideDrawerOpenHandler = () =>{
        this.setState( (prevState) =>{
            return  {showSideDrawer : !prevState.showSideDrawer};
        });
    }

    render(){
        return (<Aux>
            <Toolbar openSideDrawer={this.sideDrawerOpenHandler} isAuth={this.props.isAuthenticated}/>
            <SideDrawer 
                        open={this.state.showSideDrawer} 
                        closed={this.sideDrawerCloseHandler}
                        isAuth={this.props.isAuthenticated}/>
            <main className={classes.Content}>
                 {this.props.children}
            </main>
        </Aux>)};
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);