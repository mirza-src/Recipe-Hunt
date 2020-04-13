
import {elements, selectors, Utils} from '../common';

export default class Search
{
	static itemHTML(recipe)
	{
		return `
		<li class="result-item shadow-pointer" id="${recipe.recipe_id}">
			<div class="result-image">
				<img src="${recipe.image_url}" alt="${recipe.title}">
			</div>
			<div class="result-info">
				<div class="result-name">${recipe.title}</div>
				<div class="result-author">${recipe.publisher}</div>
			</div>
		</li>
		`;
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
				elements.results_list.append('<p class="empty-msg">Search to view results</p>');
			}
			else
			{
				elements.results_list.append('<p class="empty-msg">No results found</p>');
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