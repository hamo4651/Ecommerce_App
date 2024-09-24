import { Component } from '@angular/core';
import { ReactiveFormsModule,

  FormBuilder,
  FormControl,
  FormGroup, 
  Validators,


} from '@angular/forms';
import { NgIf } from '@angular/common';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  AddForm: FormGroup;
  categories: any[] = [];
  constructor(private fb: FormBuilder, private  categoryService: CategoryService,private router: Router,private productService: ProductService) {
    this.AddForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', [Validators.required,]],
      description: ['', [Validators.required,]],
      price: ['', [Validators.required,]],
      category_id: ['', [Validators.required,]],
      status: ['', [Validators.required,]],
      rating: ['', [Validators.required,]],
       stock: ['', [Validators.required,]],

    });
  }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.data;
      //  console.log(this.categories[0].name);
      
    });
  }
  
  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.AddForm.patchValue({
      image: file
    });
  }

  submitted = false
  
  handleSubmit(){
    this.submitted = true;
    if (this.AddForm.valid) {
      const formData = new FormData();
      Object.keys(this.AddForm.value).forEach(key => {
        formData.append(key, this.AddForm.get(key)?.value);
      });

      this.productService.addProduct(formData).subscribe(
        response => {
          console.log('Add successful:', response);
          this.router.navigate(['/product']);
        },
        error => {
          console.error('Add failed:', error);
        }
      );
    }
  }

}
