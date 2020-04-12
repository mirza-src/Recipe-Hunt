
import {elements, Utils} from '../common';

export default class Like
{
    static likeHTML(like)
    {
        var html =  `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.image}" alt="${like.id}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${Utils.fitString(like.title, 15)}</h4>
                    <p class="likes__author">${Utils.fitString(like.author, 25)}</p>
                </div>
            </a>
        </li>
      `;
      return html;
    }
    static resetFileds()
    {
        elements.likes_list.html('');
    }
    static updateView()
    {
        if (window.likes.length == 0)
        {
            elements.likes_list.append('<p class="results__author" style="text-align:center;background-color:white">Like a recipe to view it here</p>');
            return
        }
        for (var i in window.likes)
        {
            elements.likes_list.append(this.likeHTML(window.likes[i]));
        }
    }
}