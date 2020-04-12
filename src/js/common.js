import $ from "jquery";

// export const elements =
// {
//     search_button : $('#search-button'),
//     search_input : $('#search-field'),
//     likes_list : $('#likes-list'),
//     results_list : $('#results-list'),
//     selected_recipe : $('#selected-recipe'),
//     shopping_list : $('#shopping-list')
// }

export const elements =
{
    search_button : $('.search__btn'),
    search_input : $('.search__field'),
    likes_list : $('.likes__list'),
    results_list : $('.results__list'),
    selected_recipe : $('.recipe'),
    shopping_list : $('.shopping__list'),
    result_buttons : $('.results__pages'),
}

export const selectors = 
{
  next_button : '.results__btn--next',
  prev_button : '.results__btn--prev',
  search_item : '.search_item'
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
}