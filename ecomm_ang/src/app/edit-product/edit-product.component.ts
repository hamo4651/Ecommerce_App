import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  editForm: FormGroup;
  categories: any[] = [];
  productId: string = '';
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      image: [''],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      status: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      stock: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';

    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.data;
    });

    this.productService.getProduct(Number(this.productId)).subscribe((product: any) => {
      console.log(product);

      this.editForm.patchValue({
        
        name: product.data.name,
        description: product.data.description,
        price: product.data.price,
        category_id: product.data.category_id,
        status: product.data.status,
        rating: product.data.rating,
        stock: product.data.stock
      });
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.editForm.patchValue({
      image: file
    });
  }

  handleSubmit(): void {
    this.submitted = true;
  
    if (this.editForm.valid) {
      const formData = new FormData();
      Object.keys(this.editForm.value).forEach(key => {
        formData.append(key, this.editForm.get(key)?.value);
      });
      formData.append('_method', 'PUT');
      console.log('Form Data:', formData);
  
      this.productService.updateProduct(Number(this.productId),formData).subscribe(
        response => {
          console.log('Add successful:', response);
          this.router.navigate(['/product']);
        },
        error => {
          console.error('Add failed:', error.error.errors); // عرض الأخطاء المرسلة من الـ API
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
}
