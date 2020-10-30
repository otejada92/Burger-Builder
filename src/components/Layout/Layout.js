import React, { Component } from 'react'
import Aux from '../../hoc/_Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from './Navigation/ToolBar/Toolbar';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';

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
            <Toolbar openSideDrawer={this.sideDrawerOpenHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                 {this.props.children}
            </main>
        </Aux>)};
}
export default Layout;