import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice : 4.00,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 1.3,
    meat: 0.7
}

const addIngredients = (state, action) => {
    const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    console.log(updateIngredient);
    const updatedIngredients = updateObject(state.ingredients, updateIngredient);
    const updatedState=  {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);   
}

const removeIngredient = (state, action) => {
    const updateIng = {[action.ingredientName]: state.ingredients[action.ingredientName] -1}
    const updatedIngs = updateObject(state.ingredients, updateIng);
    const updatedSt=  {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedSt);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice : 4.00,
        error: false,
        building: false
    });

}
const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error: true
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: return addIngredients(state, action);
        case actionTypes.REMOVE_INGREDIENTS: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default:
            return state;
    }
}

export default reducer;