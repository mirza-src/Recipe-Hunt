import $ from "jquery";

export const elements =
{
    search_button : $('.search-icon'),
    search_input : $('.search-input'),
    likes_list : $('#likes-list'),
    results_list : $('.results-list'),
    selected_recipe : $('.recipe'),
    shopping_list : $('#shopping-list'),
    result_buttons : $('.results__pages')
}

export const selectors = 
{
  next_button : '.results__btn--next',
  prev_button : '.results__btn--prev',
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
        element.html(`<div class="loader">
        <svg>
          <use href="img/icons.svg#icon-cw"></use>
        </svg>
      </div>`);
    }
    static fitString(title, limit)
    {
      if (title.length > limit)
      {
        return title.substring(0, limit) + '...';
      }
      return title.substring(0, limit);
    };
}