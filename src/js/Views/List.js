
import {elements} from '../common';

export default class List
{
    static ingredientHTML(name, ingredient)
    {
        let html = `
        <li class="shopping__item" data-id="${ingredient.id}" data-name="${name}">
            <div class="shopping__count">
                <input type="number" value="${ingredient.amount}" min="0" class="shopping__count--value">
                <p>${ingredient.unit}</p>
            </div>
            <p class="shopping__description">${name}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
        `;
        return html;
    }
    static resetFields()
    {
        elements.shopping_list.html('');
    }
    static updateView()
    {
        for (var [key, value] of Object.entries(window.shopping))
        {
            elements.shopping_list.append(this.ingredientHTML(key, value));
        }
    }
}