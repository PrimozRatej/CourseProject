import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingridient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  rgbWhite = 'rgb(255,255,255)';
  isValid = true;
  rgbLightRed = 'rgb(240,128,128)';
  recipeIndex: number;
  isEditMode = false;
  ingredientsForDelete: boolean[] = [];
  recipe = new Recipe('', '', '', []);
  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeIndex = +params['id'];
      this.isEditMode = params['id'] != null;
    });
    if (!Number.isNaN(this.recipeIndex)) {
      this.isEditMode = true;
      this.recipe = this.recipesService.getRecipe(this.recipeIndex);
    }
    if (Number.isNaN(this.recipeIndex)) {
      this.isEditMode = false;
    }
    this.recipe.Ingredients.forEach(ing => {
      this.ingredientsForDelete.push(true);
    });
  }

  onRecipeSave() {
    for (let index = 0; index < this.ingredientsForDelete.length; index++) {
      this.setToColor(index, this.rgbWhite);
    }

    if (this.isEditMode) {
      for (let index = 0; index < this.ingredientsForDelete.length; index++) {
        this.setToColor(index, this.rgbWhite);
      }
      const ingredientsNew: Ingredient[] = [];
      for (let index = 0; index < this.ingredientsForDelete.length; index++) {
        const isItForSafe = this.ingredientsForDelete[index];
        if (isItForSafe) {
          ingredientsNew.push(this.recipe.Ingredients[index]);
        }
      }
      if (
        (this.recipe.name === '' || this.recipe.description === '',
        this.recipe.imagePath === '')
      ) {
        this.isValid = false;
      }
      console.log(this.recipe);
      console.log(ingredientsNew);
      ingredientsNew.forEach(ingr => {
        if (ingr.name === '' || ingr.amount < 1) {
          this.isValid = false;
        }
      });
      if (this.isValid) {
        this.recipe.Ingredients = ingredientsNew;
        this.recipesService.updateRecipe(this.recipeIndex, this.recipe);
      } else {
        alert(
          'Name, Description Image path or any of ingredients should not be empty also the amount of any ingrdient should not be less than 1'
        );
        this.isValid = true;
      }
    } else {
      this.recipesService.setRecipe(this.recipe);
      this.recipe = new Recipe('', '', '', []);
    }
    this.ingredientsForDelete = [];
    this.recipe.Ingredients.forEach(ing => {
      this.ingredientsForDelete.push(true);
    });
  }

  validationIng(ingredientsNew: Ingredient[]): boolean {
    ingredientsNew.forEach(ing => {
      if (ing.amount < 1 || ing.name === '') {
        console.log(ingredientsNew);
        return false;
      }
    });
    return true;

    console.log('true');
  }

  OnIngredientsRemove(ingIndex: number, recIndex: number) {
    if (!this.ingredientsForDelete[ingIndex]) {
      this.setToColor(ingIndex, this.rgbWhite);
      this.ingredientsForDelete.splice(ingIndex, 1, true);
    } else if (this.ingredientsForDelete[ingIndex]) {
      this.setToColor(ingIndex, this.rgbLightRed);
      this.ingredientsForDelete.splice(ingIndex, 1, false);
    }
  }

  setToColor(ingIndex: number, rgb: string) {
    const divToDelete = document.getElementById('div_' + ingIndex);
    const inputName = document.getElementById('inputName_' + ingIndex);
    const inputAmount = document.getElementById('inputAmount_' + ingIndex);
    divToDelete.style.backgroundColor = rgb;
    inputName.style.backgroundColor = rgb;
    inputAmount.style.backgroundColor = rgb;
  }

  onAddIngredients() {
    this.recipe.Ingredients.push(new Ingredient('New ingredient', 0));
    this.ingredientsForDelete = [];
    this.recipe.Ingredients.forEach(ing => {
      this.ingredientsForDelete.push(true);
    });
  }

  onCencel() {
    this.router.navigate(['/recipes/' + this.recipeIndex]);
  }
}
