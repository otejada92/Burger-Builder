import React, { Component } from "react";
import Aux from '../../hoc/_Aux/_Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildsControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummmary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios  from '../../axios-orders';

export class BurgerBuilder extends Component{

    state = {
        purchasing: false,
        loading : false,
    }
    
    componentDidMount(){
        this.props.onInitIngredients();
    }
    updatePurchaseable = (ingredients) => {
        
        const sum = Object.keys(ingredients).map(key =>{
            return ingredients[key];
        })
        .reduce((sum, el) => {
            return sum + el; 
        }, 0);
        return sum > 0;
    }

    purchasingHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing : true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false, loading:  false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({pathname: '/checkout'});
    }

    render(){
        const disableInfo = {...this.props.ingredients};
        for (const key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>ingredients couldn't be loaded</p> : <Spinner/>
        
        if (this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls addIngredient={this.props.onIngredientAdded} 
                               removeIngredient={this.props.onIngredientRemoved}
                               disabled={disableInfo}
                               prices={this.props.price}
                               purchaseable={!this.updatePurchaseable(this.props.ingredients)}
                               isAuth={this.props.isAuthenticated}
                               ordered={this.purchasingHandler}/>
                </Aux>);
                orderSummary = <OrderSummary ingredients={this.props.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}/>
        }
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProp = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProp = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)) 
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(withErrorHandler(BurgerBuilder, axios));