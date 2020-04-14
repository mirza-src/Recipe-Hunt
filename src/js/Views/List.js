
import {elements} from '../common';
import fracty from 'fracty';

export default class List
{
    static ingredientHTML(name, ingredient)
    {
        let html = `
        <li class="list-item" data-id="${ingredient.id}" data-name="${name}">
            <div class="item-count">
                <div class="item-unit">${fracty(ingredient.amount)} ${ingredient.unit}</div>
            </div>
            <div class="item-name recipe-text">${name}</div>
            <div class="delete-icon shadow-pointer">
                <img src="img/times-circle.svg">
            </div>
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
        var n = Object.keys(window.shopping).length;
        if (n == 0)
        {
            elements.shopping_list.append('<p class="empty-msg">Shopping List is Empty</p>');
        }
        for (var [key, value] of Object.entries(window.shopping))
        {
            elements.shopping_list.append(this.ingredientHTML(key, value));
        }
    }
}