//import { CartProjectsComponent } from './cart-projects/cart-projects.component';
//import { FavouriteProjectsComponent } from './favourite-projects/favourite-projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { Routes } from '@angular/router';
import { IndexComponent } from '../../index/index.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

export const ProjectRoutes: Routes = [
	{
		path: 'projects',
		children: [
			{
				path: '',
				component: IndexComponent
			},
			{
				path: 'all-projects',
				component: ProjectListComponent
			},
			/* {
				path: 'favourite-projects',
				component: FavouriteProjectsComponent
			}, */
		/* 	{
				path: 'cart-items',
				component: CartProjectsComponent
			}, */
			/* {
				path: 'checkouts',
				loadChildren: './checkout/checkout.module#CheckoutModule'
			}, */
			{
				path: 'project/:id',
				component: ProjectDetailComponent
			},
			
		]
	}
];
