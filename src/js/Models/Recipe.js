
import $ from 'jquery';

export default class Recipe
{
	static parseIngredients(ingredients)
	{
		const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'cups', 'teaspoons', 'teaspoon', 'pounds'];
		const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'cup', 'tsp', 'tsp', 'pound'];
		const units = [...unitsShort, 'kg', 'g'];
  
		const newIngredients = ingredients.map(el =>
		{
			let ingredient = el.toLowerCase();

			unitsLong.forEach((unit, i) =>
			{	
				ingredient = ingredient.replace(unit, units[i]);
			});
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

			const arrIng = ingredient.split(' ');
			const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

			let objIng;
			if(unitIndex > -1)
			{
				const arrCount = arrIng.slice(0, unitIndex);

				let count;
				if(unitIndex.length === 1)
				{
					count = eval(arrIng[0].replace('-', '+'));
				}
				else
				{
					count = eval(arrIng.slice(0, unitIndex).join('+'));
				}

				objIng =
				{
					count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex + 1).join(' ')
				}
			}
			else if(parseInt(arrIng[0], 10))
		   	{
				objIng =
				{
					count: parseInt(arrIng[0], 10),
					unit: '',
					ingredient: arrIng.slice(1).join(' ')
				}
		   	}
		   	else if(unitIndex === -1)
		   	{
				objIng =
				{
					count: 1,
					unit: '',
					ingredient
				}
		   	}
		   	return objIng;
		});
		return newIngredients;
	}

	static async getRecipe(id)
	{
		try
		{
			var recipe = (await $.get(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)).recipe;
			window.selected.id = id;
			window.selected.title = recipe.title;
			window.selected.image = recipe.image_url;
			window.selected.author = recipe.publisher;
			window.selected.link = recipe.source_url;
			window.selected.serving = 1;
			window.selected.ingredients = this.parseIngredients(recipe.ingredients);
			window.selected.liked = window.likes.find(item => item.id == id) == undefined ? false : true;
		}
		catch(error)
		{
			console.log(error)
			window.selected = {};
		}
	}
	static updateServings(n)
	{
		var old = window.selected.serving;
		if (old == 1 && n < 0)
		{
			return;
		}
		window.selected.serving += n;
		window.selected.ingredients.forEach(ing =>
		{
		  ing.count *= (window.selected.serving / old);
		});
	}
}