import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Option} from '../../../shared/model/item';
import { ItemService } from 'src/app/shared/services/item.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent  {
  itemGorup: FormGroup;
  categories: Observable<Option[]>;

  constructor(
    private dialogRef: MatDialogRef<AddComponent>,
    fb: FormBuilder,
    itemService: ItemService
  ) {

    this.itemGorup = fb.group({
      title: ['', Validators.required],
      quantity: ['', Validators.required],
      active: [true],
      creation_date: ['', Validators.required],
      category: ['', Validators.required],
      details: [''],
    });
    this.categories = itemService.filters.pipe(
      map(filters => filters.find(f => f.category === 'category')),
      map(filter => filter.options),
    );
  }

  saveItem() {
    // Save to backend
    console.log(this.itemGorup.value);
    this.dialogRef.close();
  }

  close(){
    this.itemGorup.reset();
    this.dialogRef.close();
  }

}
