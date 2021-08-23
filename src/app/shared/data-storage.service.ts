import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put('https://courseprojectdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  getRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .get<Recipe[]>('https://courseprojectdb.firebaseio.com/recipes.json')
      .subscribe(response => {
        console.log(recipes);
        this.recipesService.reloadRecipes(response);
      });
  }
}
