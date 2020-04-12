import '../css/style.css'
import "regenerator-runtime/runtime.js";
import $ from "jquery";
import {elements, selectors} from './common';
import SearchModel from './Models/Search';
import SearchView from './Views/Search';
import RecipeModel from './Models/Recipe';
import RecipeView from './Views/Recipe';

function addSearchHandlers()
{
	$(selectors.search_item).click(Controller.recipeControl);
	$(selectors.next_button).click(Controller.pageHandler);
	$(selectors.prev_button).click(Controller.pageHandler);
}

class Controller
{
	static pageHandler(event)
	{
		SearchView.resetFields();
		SearchView.updateView(parseInt(this.dataset.offset));
		addSearchHandlers();
	}
	static async searchControl()
	{
		SearchView.displayLoader();
		await SearchModel.getResults(SearchView.getQuery());
		SearchView.resetFields();
		SearchView.updateView();
	}
	static async recipeControl()
	{
		RecipeView.displayLoader();
		await RecipeModel.getRecipe(this.id);
		RecipeView.resetFields();
		RecipeView.updateView();
	}
	static defaultRender()
	{
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
		this.defaultRender();
		elements.search_button.click(()=>
		{
			this.searchControl().then(()=>
			{
				addSearchHandlers();
			})
		});
	}
}

Controller.setup();