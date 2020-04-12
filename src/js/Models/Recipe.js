
import $ from 'jquery';

export default class Recipe
{
    static async getRecipe(id)
    {
        try
        {
            window.selected = (await $.get(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)).recipe;
        }
        catch(error)
        {
            window.selected = {};
        }
    }
}