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
  astronaut: FormGroup;
  undergraduateMajors: Observable<Option[]>;

  constructor(
    private dialogRef: MatDialogRef<AddComponent>,
    fb: FormBuilder,
    astronautService: ItemService
  ) {
    this.astronaut = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleInitial: ['', Validators.maxLength(1)],
      active: [true],
      birthdate: ['', Validators.required],
      undergraduateMajor: ['', Validators.required]
    });
    this.undergraduateMajors = astronautService.filters.pipe(
      map(filters => filters.find(f => f.category === 'undergraduateMajor')),
      map(filter => filter.options),
    );
  }

  saveAstronaut() {
    // Save to backend
   
    console.log(this.astronaut.value);
    this.dialogRef.close();
  }
}
