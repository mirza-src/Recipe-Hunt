
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
	ListModel.saveIngredients();
	addListHandlers()
}

function addSearchHandlers()
{
	$(selectors.search_item).click(Controller.recipeControl);
	$(selectors.pages_buttons).click(pageHandler);
}

function addRecipeHandlers()
{
	$(selectors.servings_button).click(servingsHandler);
	$(selectors.like_button).click(Controller.likeControl);
	$(selectors.recipe_button).click(Controller.listControl);
}

function addLikeHandlers()
{
	$(selectors.search_item).click(Controller.recipeControl);
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
		ListModel.saveIngredients();
		addListHandlers();
	}
	static likeControl()
	{
		LikeModel.toggleLike();
		LikeView.resetFileds();
		LikeView.updateView();
		LikeModel.saveLikes();
		RecipeView.resetFields();
		RecipeView.updateView();
		addRecipeHandlers();
		addLikeHandlers();
	}
	static async searchControl()
	{
		SearchView.open();
		SearchView.displayLoader();
		await SearchModel.getResults(SearchView.getQuery());
		SearchView.resetFields();
		SearchView.updateView();
		addSearchHandlers();
	}
	static async recipeControl()
	{
		RecipeView.open();
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
		addLikeHandlers();
		ListModel.loadIngredients();
		ListView.resetFields();
		ListView.updateView();
		addListHandlers();
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
		elements.search_input.keypress(function(event)
		{
			if (event.which == 13)
			{
				event.preventDefault();
				elements.search_button.click();
			}
		}); 
	}
}

Controller.setup();