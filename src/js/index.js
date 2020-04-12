import '../css/style.css'
import "regenerator-runtime/runtime.js";
import $ from "jquery";
import {elements, selectors} from './common';
import SearchModel from './Models/Search';
import SearchView from './Views/Search';
import RecipeModel from './Models/Recipe';
import RecipeView from './Views/Recipe';
import LikeModel from './Models/Like';
import LikeView from './Views/Like';

function addSearchHandlers()
{
	$(selectors.search_item).click(Controller.recipeControl);
	$(selectors.next_button).click(Controller.pageHandler);
	$(selectors.prev_button).click(Controller.pageHandler);
}

function addRecipeHandlers()
{
	$(selectors.servings_button).click(Controller.servingsHandler);
	$(selectors.like_button).click(Controller.likeControl);
}

class Controller
{
	static pageHandler()
	{
		SearchView.resetFields();
		SearchView.updateView(parseInt(this.dataset.offset));
		addSearchHandlers();
	}
	static servingsHandler()
	{
		RecipeModel.updateServings(parseInt(this.dataset.amount));
		RecipeView.updateServings();
	}
	static likeControl()
	{
		LikeModel.toggleLike();
		console.log(window.likes);
	}
	static async searchControl()
	{
		SearchView.displayLoader();
		await SearchModel.getResults(SearchView.getQuery());
		SearchView.resetFields();
		SearchView.updateView();
		addSearchHandlers();
	}
	static async recipeControl()
	{
		RecipeView.displayLoader();
		await RecipeModel.getRecipe(this.id);
		RecipeView.resetFields();
		RecipeView.updateView();
		addRecipeHandlers();
	}
	static defaultRender()
	{
		SearchView.resetFields();
		SearchView.updateView();
		RecipeView.resetFields();
		RecipeView.updateView();
		LikeModel.loadLikes();
	}
	static setup()
	{
		window.query = '';
		window.results = [];
		window.selected = {};
		window.shopping = [];
		window.likes = [];
		this.defaultRender();
		elements.search_button.click(this.searchControl);
	}
}

Controller.setup();