import http from './httpService';
import {myUrl} from '../config.json';

export function createRecipe(recipe) {
    return http.post(`${myUrl}/recipes`, recipe);
}

export  function getMyRecipes () {
    return http.get(`${myUrl}/recipes/myrecipes`);
}

export function deleteRecipe (recipeId) {
    return http.delete(`${myUrl}/recipes/${recipeId}`);
}

export function getRecipe (id){
    return http.get(`${myUrl}/recipes/${id}`)
}

export function getAllRecipes(){
    return http.get(`${myUrl}/recipes/all`)
}

export function editRecipe(recipe){
    const recipeId = recipe._id;
    delete recipe._id;
    return http.put(`${myUrl}/recipes/${recipeId}`, recipe);
}

export default {
    createRecipe,
    getMyRecipes,
    getRecipe,
    getAllRecipes,
    editRecipe,
    deleteRecipe
};