import $ from 'jquery';

import {elements} from '../common';

export default class Search
{
	static async getResults(query)
	{
		window.query = query;
		if (query == '')
		{
			return;
		}
		try
		{
			window.results = (await $.get(`https://forkify-api.herokuapp.com/api/search?q=${query}`)).recipes;
		}
		catch(error)
		{
			window.results = [];
		}
	}
};
