
import {elements, Utils} from '../common';

export default class Search
{
	static fitString(title, limit)
	{
		if (title.length > limit)
		{
			return title.substring(0, limit) + '...';
		}
		return title.substring(0, limit);
	};
	static itemHTML(recipe)
	{
		return `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${this.fitString(recipe.title, 15)}</h4>
                    <p class="results__author">${this.fitString(recipe.publisher, 25)}</p>
                </div>
            </a>
        </li>`;
	}
	static resetFields()
	{
		elements.search_input.val('');
		elements.results_list.html('');
	}
	static getQuery()
	{
		return elements.search_input.val();
	}
	static displayLoader()
	{
		Utils.displayLoader(elements.results_list);
	}
	static updateView()
	{
		if (window.results.length == 0)
		{
			if (window.query == '')
			{
				elements.results_list.append('<p class="results__author" style="text-align:center">Search to view results</p>');
			}
			else
			{
				elements.results_list.append('<p class="results__author" style="text-align:center">No results found</p>');
			}
		}
		else
		{
			for (var i in window.results)
			{
				elements.results_list.append(this.itemHTML(window.results[i]));
			}
		}
	}
}