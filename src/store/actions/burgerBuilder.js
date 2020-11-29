import * as actionTypes from './actionTypes';
import axios  from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    };
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}
export const setIngredients = (ingredient) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredient
    };
}
export const initIngredients = () => {
    return dispatch => {
        axios.get("/ingredients.json").then(response => {
            dispatch(setIngredients(response.data));
        }).catch(error => {
            dispatch(fetchIngredientsFailed());
        }); 
    }
}