import { Routes } from '@angular/router';
import { MasterComponent } from './master/master.component';
import { log } from 'console';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { CategoryComponent } from './dashbourd/category/category.component';
import { AdminGuard } from './admin.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { AddProductComponent } from './dashbourd/products/add-product/add-product.component';
import { ProductDetailsComponent } from './dashbourd/products/product-details/product-details.component';
import { FilteredComponent } from './master/filtered/filtered.component';
import { ShowproductsComponent } from './showproducts/showproducts.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './dashbourd/order/order.component';
import { MyordersComponent } from './myorders/myorders.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { DashbourdComponent } from './dashbourd/dashbourd.component';
import { AddCategoryComponent } from './dashbourd/category/add-category/add-category.component';
import { EditCategoryComponent } from './dashbourd/category/edit-category/edit-category.component';
import { ProductsComponent } from './dashbourd/products/products.component';
import { EditProductComponent } from './dashbourd/products/edit-product/edit-product.component';

export const routes: Routes = [

{
    path: '',
    component:MasterComponent
},
{
    path: 'category',
    component:CategoryComponent,canActivate: [AdminGuard] ,

  
},
{
    path: 'add_category',
    component: AddCategoryComponent ,canActivate: [AdminGuard] ,

},
{
    path: 'edit_category/:id',
    component: EditCategoryComponent , canActivate: [AdminGuard] ,

},
{
    path: 'details/:id',
    component: ProductDetailsComponent ,

},
{
    path: 'product',
    component:ProductsComponent,canActivate: [AdminGuard] ,

  
},
{
    path: 'add_product',
    component: AddProductComponent ,canActivate: [AdminGuard] ,

},
{
    path: 'edit_product/:id',
    component: EditProductComponent , canActivate: [AdminGuard] ,

},
{
    path: 'show_products',
    component: ShowproductsComponent 

},
{
    path: 'search',
    component: SearchResultComponent 

},
{
    path: 'cart',
    component: CartComponent ,canActivate: [AuthGuard]

},
{
    path: 'orders',
    component: OrderComponent ,canActivate: [AdminGuard] 

},
{
    path: 'myorders',
    component: MyordersComponent ,canActivate: [AuthGuard]

},

{
    path: 'filter/:id',
    component: FilteredComponent , 

},
{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
{
    path: 'login',
    component:LoginComponent 
},{
    path: 'register',
    component:RegisterComponent
}

,
{
    path: 'favorites',
    component:FavoritesComponent ,canActivate: [AuthGuard]
},
{
    path: 'dashboard',
    component:DashbourdComponent 
},
{
    path: 'not-authorized',
    component:NotAuthorizedComponent
}

,
{
    path: '**',
    redirectTo: 'login'

}

];
