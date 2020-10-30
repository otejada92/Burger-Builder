import React from 'react';
import burgerLogo from '../../assest/images/burger-logo.png';
import classes from './burger-logo.module.css';

const logo = () => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="My Burger Logo"></img>
    </div>
);

export default logo;