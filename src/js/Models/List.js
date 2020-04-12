
export default class List
{
    static id = 0;
    static addIngredients()
    {
        for (var i in window.selected.ingredients)
        {
            let ingredient = window.selected.ingredients[i];
            if (ingredient.ingredient in window.shopping)
            {
                window.shopping[ingredient.ingredient].amount += ingredient.count;
            }
            else
            {
                let item = 
                {
                    id : this.id,
                    amount : ingredient.count,
                    unit : ingredient.unit
                }
                window.shopping[ingredient.ingredient] = item;
            }
            this.id++;
        }
    }
    static deleteIngredient(name)
    {
        console.log(name);
        delete window.shopping[name];
    }
}