import { Ingredient } from '../shared/ingridient.model';
import { Subject } from 'rxjs';

export class ShopingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('apple', 8),
    new Ingredient('tomato', 4),
    new Ingredient('orange', 12),
    new Ingredient('mysterious dragon egg', 1)
  ];
  getIngredients() {
    return this.ingredients.slice(0, this.ingredients.length);
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(
      this.ingredients.slice(0, this.ingredients.length)
    );
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
