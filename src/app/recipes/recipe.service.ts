import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingridient.model';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [];
  /* new Recipe(
      'Salami Pizza',
      'Pizza with salami on',
      'https://cdn.pixabay.com/photo/2019/08/23/13/06/pizza-4425695_960_720.jpg',
      [
        new Ingredient('dough', 1),
        new Ingredient('tomato', 1),
        new Ingredient('chezze', 1),
        new Ingredient('salt', 1)
      ]
    ),
    new Recipe(
      'Margarita',
      'Pizza with no salami',
      'https://cdn.pixabay.com/photo/2019/08/23/13/06/pizza-4425695_960_720.jpg',
      [
        new Ingredient('dough', 1),
        new Ingredient('tomato', 1),
        new Ingredient('chezze', 1),
        new Ingredient('salami', 1)
      ]
    )
  ]; */

  getRecipes() {
    return this.recipes.slice(0, this.recipes.length);
  }

  getRecipe(index: number) {
    const recipeRef = this.recipes[index];
    const name = recipeRef.name;
    const description = recipeRef.description;
    const imagePath = recipeRef.imagePath;
    const IngredientsCopy: Ingredient[] = [];
    recipeRef.Ingredients.forEach(IngrRef => {
      IngredientsCopy.push(new Ingredient(IngrRef.name, IngrRef.amount));
    });

    return new Recipe(name, description, imagePath, IngredientsCopy);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index].name = recipe.name;
    this.recipes[index].description = recipe.description;
    this.recipes[index].imagePath = recipe.imagePath;
    this.recipes[index].Ingredients = recipe.Ingredients.slice();
  }

  setRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  getRecipesRef() {
    return this.recipes;
  }

  deleteRecipe(recipe: Recipe) {
    const index = this.recipes.indexOf(recipe);
    this.recipes.splice(index, 1);
  }

  indexOf(recipe: Recipe) {
    return this.recipes.indexOf(recipe);
  }

  reloadRecipes(recipes: Recipe[]) {
    this.recipes.splice(0, recipes.length);
    this.recipes = recipes;
  }
}
