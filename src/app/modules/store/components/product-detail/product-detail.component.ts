import { Store } from '@ngrx/store';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { addToCart } from 'src/app/store/storeActions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productInfo:any
  constructor(
    public store:Store,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public modelData: any
 ) { }

  ngOnInit(): void {
    this.productInfo = this.modelData.productData;
    console.log(this.modelData);
  }
  addToCart():void{
    this.dialogRef.close();
    this.snackBar.open(`Product added to cart ..`, 'X', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass:'snack_bar',
      duration:2500
    })
    this.store.dispatch(addToCart({payload : this.productInfo}))
  }
}
