import { ReturnMemoItemsService } from './../../return-memo-items.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-is-returnable-pop-up',
  templateUrl: './is-returnable-pop-up.component.html',
  styleUrls: ['./is-returnable-pop-up.component.sass']
})
export class IsReturnablePopUpComponent implements OnInit {
  isReturnableForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<IsReturnablePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public fb: FormBuilder,
    public returnMemoItemsService: ReturnMemoItemsService) {
      this.isReturnableForm = this.fb.group({
        isReturnable: false
      });
     }

    checkOveridePolicyAndSetValue(){
      this.dialogRef.close({ data: this.isReturnableForm.value })
    }
  ngOnInit(): void {
    

  }

}
