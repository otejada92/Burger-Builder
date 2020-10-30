import React from 'react';
import Aux from '../../../hoc/_Aux/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) =>{

    const ingredients = Object.keys(props.ingredients).map(key =>{ 
        return (
            <li>
                <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
            </li>
        );
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the foolowing ingrendients: </p>
            <ul>
                {ingredients}
            </ul>
            <p><strong>Total price: {props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};

export default OrderSummary;