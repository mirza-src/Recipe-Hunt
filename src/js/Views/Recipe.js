
import {elements, selectors, Utils} from '../common';
import $ from 'jquery'
import fracty from 'fracty';

export default class Recipe
{
    static formatCount(count){
        if (count) {
          return `${fracty(count)}`;
        }
        return '?';
      };
    static ingredientHTML(ingredient)
    {
        return `
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${this.formatCount(ingredient.count)}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.ingredient}
            </div>
        </li>
      `
    }
    static resetFields()
    {
        elements.selected_recipe.html('');
    }
    static displayLoader()
    {
        Utils.displayLoader(elements.selected_recipe);
    }
    static updateView()
    {
        if ($.isEmptyObject(window.selected))
        {
            elements.selected_recipe.append('<p class="results__author" style="text-align:center;background-color:white">Select a recipe to view it here</p>');
            return
        }
        var html = `
        <figure class="recipe__fig">
            <img src="${window.selected.image}" alt="${window.selected.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${window.selected.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">1</span>
                <span class="recipe__info-text"> servings</span>
  
                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease" data-amount="-1">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase" data-amount="1">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>
  
            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart"></use>
                </svg>
            </button>
        </div>
  
  
  
        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
            ${window.selected.ingredients.map(el => this.ingredientHTML(el)).join('')}
            </ul>
  
            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>
  
        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${window.selected.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${window.selected.link}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>
  
            </a>
        </div>
      `;
      elements.selected_recipe.append(html);
    }
    static updateServings()
    {
        $(selectors.servings).html(`${window.selected.serving}`);
        $(selectors.ingredients_list).html(window.selected.ingredients.map(el => this.ingredientHTML(el)).join(''));
    }
}