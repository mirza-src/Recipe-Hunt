
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css'

import "regenerator-runtime/runtime.js";
import {elements, selectors} from './common';
import SearchModel from './Models/Search';
import SearchView from './Views/Search';
import RecipeModel from './Models/Recipe';
import RecipeView from './Views/Recipe';
import LikeModel from './Models/Like';
import LikeView from './Views/Like';
import ListModel from './Models/List';
import ListView from './Views/List';

function pageHandler()
{
	SearchView.resetFields();
	SearchView.updateView(parseInt(this.dataset.offset));
	addSearchHandlers();
}

function servingsHandler()
{
	RecipeModel.updateServings(parseInt(this.dataset.amount));
	RecipeView.updateServings();
}

function deleteHandler()
{
	let name = this.closest(selectors.list_item).dataset.name;
	ListModel.deleteIngredient(name);
	console.log(window.shopping);
	ListView.resetFields();
	ListView.updateView();
	addListHandlers()
}

function addSearchHandlers()
{
	$(selectors.search_item).click(Controller.recipeControl);
	$(selectors.next_button).click(pageHandler);
	$(selectors.prev_button).click(pageHandler);
}

function addRecipeHandlers()
{
	$(selectors.servings_button).click(servingsHandler);
	$(selectors.like_button).click(Controller.likeControl);
	$(selectors.recipe_button).click(Controller.listControl);
}

function addLikeHandlers()
{

}

function addListHandlers()
{
	$(selectors.list_delete).click(deleteHandler);
}


class Controller
{
	static listControl()
	{
		ListModel.addIngredients();
		ListView.resetFields();
		ListView.updateView();
		addListHandlers();
	}
	static likeControl()
	{
		LikeModel.toggleLike();
		LikeView.resetFileds();
		LikeView.updateView();
		RecipeView.resetFields();
		RecipeView.updateView();
		addRecipeHandlers();
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
		LikeView.resetFileds();
		LikeView.updateView();
		ListView.resetFields();
		ListView.updateView();
	}
	static setup()
	{
		window.query = '';
		window.results = [];
		window.selected = {};
		window.shopping = {}
		window.likes = [];
		this.defaultRender();
		elements.search_button.click(this.searchControl);
	}
}

Controller.setup();