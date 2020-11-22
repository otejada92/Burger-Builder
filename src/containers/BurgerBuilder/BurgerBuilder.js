import React, { Component } from "react";
import Aux from '../../hoc/_Aux/_Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildsControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummmary/OrderSummary';
import axios  from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions';

class BurgerBuilder extends Component{

    state = {
        purchasing: false,
        loading : false,
        error:false
    }

    componentDidMount = () =>{
        
        // axios.get("/ingredients.json").then(response => {
        //     this.setState({ingredients: response.data})
        // }).catch(error => {
        //     this.setState({error : true})
        // });
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
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false, loading:  false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push({pathname: '/checkout'});
    }

    render(){
        const disableInfo = {...this.props.ingredients};
        for (const key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>ingredients couldn't be loaded</p> : <Spinner/>
        
        if (this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls addIngredient={this.props.onIngredientAdded} 
                               removeIngredient={this.props.onIngredientRemoved}
                               disabled={disableInfo}
                               prices={this.props.price}
                               purchaseable={!this.updatePurchaseable(this.props.ingredients)}
                               ordered={this.purchasingHandler}/>
                </Aux>);
                orderSummary = <OrderSummary ingredients={this.props.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}/>
        }

        if(this.state.loading)
        {
            orderSummary = <Spinner/>
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
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}
const mapDispatchToProp = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch({type: actionType.ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredientRemoved : (ingName) => dispatch({type: actionType.REMOVE_INGREDIENTS, ingredientName: ingName})
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(withErrorHandler(BurgerBuilder, axios));