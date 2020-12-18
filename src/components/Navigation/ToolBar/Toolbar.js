import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Toggle from '../ToolBar/Toggle/Toggle';

const toolbar = (props) =>(
    <header className={classes.Toolbar}>
        <Toggle clicked={props.openSideDrawer}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
        </nav>
    </header>
);
export default toolbar;

