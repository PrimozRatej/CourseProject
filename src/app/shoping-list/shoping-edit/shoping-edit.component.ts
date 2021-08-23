import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingridient.model';
import { ShopingListService } from '../shoping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  isEditMode = false;
  editedItemIndex: number = null;
  editedItem: Ingredient;
  constructor(private slService: ShopingListService) {}

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.isEditMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onAddItem(form: NgForm) {
    const values = form.value;
    const newIngredient = new Ingredient(values.name, values.amount);

    if (this.isEditMode) {
      console.log(newIngredient);
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.isEditMode = false;
    form.reset();
    this.editedItemIndex = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.isEditMode = false;
    this.slForm.reset();
    this.editedItemIndex = null;
  }

  onDelete() {
    this.isEditMode = false;
    console.log(this.editedItemIndex);
    if (this.editedItemIndex !== null) {
      this.slService.deleteIngredient(this.editedItemIndex);
    }
    this.slForm.reset();
    this.editedItemIndex = null;
  }
}
