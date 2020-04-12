import $ from "jquery";

export const elements =
{
    search_button : $('.search__btn'),
    search_input : $('.search__field'),
    likes_list : $('.likes__list'),
    results_list : $('.results__list'),
    selected_recipe : $('.recipe'),
    shopping_list : $('.shopping__list'),
    result_buttons : $('.results__pages'),
    likes_list : $('.likes__list')
}

export const selectors = 
{
  next_button : '.results__btn--next',
  prev_button : '.results__btn--prev',
  search_item : '.results__link',
  servings : '.recipe__info-data--people',
  ingredients : '.recipe__count',
  servings_button : '.btn-increase, .btn-decrease',
  ingredients_list : '.recipe__ingredient-list',
  like_button : '.recipe__love'
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