import '../css/style.css'
import "regenerator-runtime/runtime.js";
import $ from "jquery";
import {elements} from './common';
import SearchModel from './Models/Search';
import SearchView from './Views/Search';




class Controller
{
	static async searchControl()
	{
		SearchView.displayLoader();
		await SearchModel.getResults(SearchView.getQuery());
		SearchView.resetFields();
		SearchView.updateView();
	}
	static setup()
	{
		window.query = '';
		window.results = [];
		window.selected = {};
		window.shopping = [];
		window.likes = [];
		elements.search_button.click(this.searchControl);
	}
}

Controller.setup();