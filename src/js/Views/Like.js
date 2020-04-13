
import {elements, Utils} from '../common';

export default class Like
{
    static likeHTML(like)
    {
        var html =  `
        <li class="result-item shadow-pointer">
            <div class="result-image">
                <img src="${like.image}" alt="${like.id}">
            </div>
            <div class="result-info">
                <div class="result-name">${like.title}</div>
                <div class="result-author">${like.author}</div>
            </div>
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
            elements.likes_list.append('<p class="empty-msg">Like a recipe to view it here</p>');
            return
        }
        for (var i in window.likes)
        {
            elements.likes_list.append(this.likeHTML(window.likes[i]));
        }
    }
}