import $ from "jquery";

export const elements =
{
    search_button : $('.search-icon'),
    search_input : $('.search-input'),
    likes_list : $('#likes-list'),
    results_list : $('.results-list'),
    selected_recipe : $('.recipe'),
    shopping_list : $('#shopping-list'),
    result_buttons : $('.pages-buttons'),
    results_pane : $('#results, #results-link'),
    recipe_pane : $('#recipe, #recipe-link')
}

export const selectors = 
{
  pages_buttons : '.next-button, .prev-button',
  search_item : '.result-item',
  servings : '.servings-count',
  ingredients : '.ingredient-amount',
  servings_button : '.servings-button',
  ingredients_list : '.ingredients-list',
  like_button : '.recipe-like',
  recipe_button : '#ingredients-button',
  list_delete : '.delete-icon',
  list_item : '.list-item'
}

export class Utils
{
    static displayLoader(element)
    {
        element.html(`<div class="loading"></div>`);
    }
}