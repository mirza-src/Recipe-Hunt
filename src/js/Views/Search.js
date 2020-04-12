
import {elements, selectors, Utils} from '../common';

export default class Search
{
	static itemHTML(recipe)
	{
		return `
        <li class="results__link" id="${recipe.recipe_id}">
			<figure class="results__fig">
				<img src="${recipe.image_url}" alt="${recipe.title}">
			</figure>
			<div class="results__data">
				<h4 class="results__name">${Utils.fitString(recipe.title, 15)}</h4>
				<p class="results__author">${Utils.fitString(recipe.publisher, 25)}</p>
			</div>
        </li>`;
	}
	static buttonsHTML(offset, n)
	{
		var current = offset / n;
		var html = '';
		if (current > 0)
		{
			html += `
			<button class="btn-inline results__btn--prev" data-offset=${offset - n}>
				<span>Prev</span>
				<svg class="search__icon">
					<use href="img/icons.svg#icon-triangle-${'left'}"></use>
				</svg>
			</button>`;
		}
		if ((offset + n) < window.results.length)
		{
			html += `
			<button class="btn-inline results__btn--next" data-offset=${offset + n}>
				<span>Next</span>
				<svg class="search__icon">
					<use href="img/icons.svg#icon-triangle-${'right'}"></use>
				</svg>
			</button>`;
		}
		return html;
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
	static updateView(offset=0, n=10)
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
			var end = offset + n
			var limit = window.results.length < end ? window.results.length : end;
			for (var i = offset ; i < limit ; i++)
			{
				elements.results_list.append(this.itemHTML(window.results[i]));
			}
			elements.result_buttons.html(this.buttonsHTML(offset, n));
		}
	}
}