import { 
    Pipe, 
    PipeTransform 
 } from '@angular/core';  
 
 @Pipe ({ 
    name: 'productcurrency' 
 }) 
 
 export class ProductCurrencyPipe implements PipeTransform { 
    transform(value: number, currentcyType: string): any { 
       if(currentcyType === 'USD'){
        return '$'+value;
       }
       return 'Rs.'+value;
    } 
 } 