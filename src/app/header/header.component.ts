import { Component /* OnInit, Output, EventEmitter  */ } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private dataStorageSevice: DataStorageService) {}

  onSave() {
    this.dataStorageSevice.storeRecipes();
  }

  onfetch() {
    this.dataStorageSevice.getRecipes();
  }
  /* @Output() featureSelected = new EventEmitter<string>();

  onSelect(tag: string) {
    this.featureSelected.emit(tag);
  } */
}
