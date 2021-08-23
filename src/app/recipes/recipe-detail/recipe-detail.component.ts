import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShopingListService } from 'src/app/shoping-list/shoping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { interval, Subscribable, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  private fistSub: Subscription;
  recipe: Recipe;
  id: number;
  constructor(
    private slService: ShopingListService,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });

    /* const customObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        count++;
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Countis greater than 3'));
        }
      }, 1000);
    });

    this.fistSub = customObservable
      .pipe(
        filter(data => {
          return data > 2;
        }),
        map((data: number) => {
          return 'Round: ' + data;
        })
      )
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
          alert(error);
        },
        () => {
          console.log('Completed');
        }
      ); */

    /* first observalbe */
    /*     this.fistSub = interval(1000).subscribe(count => {
      console.log(count);
    }); */
  }

  toShopingListClicked() {
    this.recipe.Ingredients.forEach(ingredient => {
      this.slService.addIngredient(ingredient);
    });
  }

  /* ngOnDestroy(): void {
    this.fistSub.unsubscribe();
  } */
  /* Destroy first observalbe */
  /*  ngOnDestroy(): void {
    this.fistSub.unsubscribe();
  } */

  onDeleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe);
    if (this.recipeService.getRecipes()[0] === undefined) {
      this.router.navigate(['/recipes']);
    } else {
      this.router.navigate(['/recipes/0']);
    }
  }
}
