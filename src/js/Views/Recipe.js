
import {elements, selectors, Utils} from '../common';
import $ from 'jquery';
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
        <li class="ingredient-item">
            <img src="img/check-circle.svg">
            <span class="ingredient-amount recipe-text">${this.formatCount(ingredient.count)} ${ingredient.unit}</span>
            <span class="ingredient-name recipe-text">${ingredient.ingredient}</span>
        </li>
       `;
    }
    static resetFields()
    {
        elements.selected_recipe.html('');
    }

    static open()
    {
        elements.recipe_pane.addClass('active');
        elements.results_pane.removeClass('active');
    }

    static displayLoader()
    {
        Utils.displayLoader(elements.selected_recipe);
    }
    static updateView()
    {
        if ($.isEmptyObject(window.selected))
        {
            elements.selected_recipe.append("<p class='empty-msg'>Select a recipe to view it's details</p>");
            return;
        }
        var flag = window.selected.liked;
        var html = `
        <div class="recipe-image">
            <img src="${window.selected.image}" alt="${window.selected.title}">
        </div>
        <div class="recipe-name">
            <a href="${window.selected.link}">
                <span>${window.selected.title}</span>
            </a>
        </div>
        <div class="recipe-controls">
            <div class="recipe-servings">
                <img src="img/user-friends.svg">
                <span class="servings-count recipe-text">1 Serving</span>
                <div class="servings-buttons">
                    <div class="servings-button plus shadow-pointer" data-amount="-1">
                        <img src="img/minus-circle.svg">
                    </div>
                    <div class="servings-button plus shadow-pointer" data-amount="1">
                        <img src="img/plus-circle.svg">
                    </div>
                </div>
            </div>
            <div class="recipe-like shadow-pointer">
                <img src="img/heart-outline.svg" ${flag ? 'class="hidden"' : ''}>
                <img src="img/heart.svg" ${flag ? '' : 'class="hidden"'}>
            </div>
        </div>
        <div class="recipe-ingredients">
            <div class="recipe-titles">Ingredients</div>
            <ul class="ingredients-list">
                ${window.selected.ingredients.map(el => this.ingredientHTML(el)).join('')}
            </ul>
            <div class="recipe-button shadow-pointer" id="ingredients-button">
                <img src="img/shopping-cart.svg">
                <span>Add to shopping list</span>
            </div>
        </div>
        <div class="recipe-directions">
            <div class="recipe-titles">Directions</div>
            <div class="recipe-msg">
                This recipe was created by 
                <span class="recipe-text">${window.selected.author}</span>. Please check out directions at their website.
            </div>
            <a class="recipe-button shadow-pointer" id="directions-button" href="${window.selected.link}">
                <img src="img/shopping-cart.svg">
                <span>View Directions</span>
            </a>
        </div>
      `;
      elements.selected_recipe.append(html);
      this.updateServings();
    }
    static updateServings()
    {
        let amount = window.selected.serving;
        let text = amount == 1 ? 'Serving' : 'Servings';
        $(selectors.servings).html(`${amount} ${text}`);
        $(selectors.ingredients_list).html(window.selected.ingredients.map(el => this.ingredientHTML(el)).join(''));
    }
}