import React, { Component } from "react";
import Aux from '../../hoc/_Aux/_Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildsControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummmary/OrderSummary';
import axios  from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.1,
    banco: 2.0,
    cheese: 1.5,
    bacon: 2.5,
    meat: 3
}


class BurgerBuilder extends Component{


    state = {
        ingredients: null,
        price : 4.00,
        purchaseable: false,
        purchasing: false,
        loading : false,
        error:false
    }
    
    
    componentDidMount = () =>{
        
        axios.get("/ingredients.json").then(response => {
            this.setState({ingredients: response.data})
        }).catch(error => {
            this.setState({error : true})
        });
    }

    addIngredientHandler = (type) => {
        
        const currentIngredientCount = this.state.ingredients[type];
        const updatedIngredientCount = currentIngredientCount + 1;

        const newIngredientCountState = {
            ...this.state.ingredients
        }

        newIngredientCountState[type] = updatedIngredientCount; 

        const currentPrice = this.state.price;
        const newPrice = INGREDIENT_PRICES[type] + currentPrice;

        this.setState({ingredients : newIngredientCountState, price: newPrice});
        this.updatePurchaseable(newIngredientCountState);

    }

    removeIngredientHandler = (type) => {

        const currentIngredientCount = this.state.ingredients[type];
        const updatedIngredientCount = currentIngredientCount -1;
        const newIngredientCountState = {
            ...this.state.ingredients
        }

        newIngredientCountState[type] = updatedIngredientCount; 

        const currentPrice = this.state.price;
        const newPrice = currentPrice - INGREDIENT_PRICES[type];

        this.setState({ingredients : newIngredientCountState, price: newPrice});
        this.updatePurchaseable(newIngredientCountState);

    }
    
    updatePurchaseable = (ingredients) => {
        
        const sum = Object.keys(ingredients).map(key =>{
            return ingredients[key];
        })
        .reduce((sum, el) => {
            return sum + el; 
        }, 0);
        
        this.setState({purchaseable : sum > 0});
    }

    purchasingHandler = () => {
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false, loading:  false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading : true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'Osvaldo Tejada',
                address: {
                    street: 'teststrees 1',
                    zipcode: '1232',
                    country: "RD"
                },
                email: "sdfsdf@gmail.com",
                paymentMethod: 'CC'
            }
        }
        axios.post('orders.json', order)
            .then(response => this.setState({loading : false, purchasing: false}))
            .catch(error =>       this.setState({loading : false, purchasing: false}));
    }


    
    render(){
        const disableInfo = {...this.state.ingredients};
        for (const key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>ingredients couldn't be loaded</p> : <Spinner/>

        if (this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls addIngredient={this.addIngredientHandler} 
                               removeIngredient={this.removeIngredientHandler}
                               disabled={disableInfo}
                               prices={this.state.price}
                               purchaseable={!this.state.purchaseable}
                               ordered={this.purchasingHandler}/>
                </Aux>);
                orderSummary = <OrderSummary ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.price}/>
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

export default WithErrorHandler(BurgerBuilder, axios);