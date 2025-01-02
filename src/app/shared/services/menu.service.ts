import { Injectable } from '@angular/core';
import { Menu } from '../interface/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  MENUITEMS: Menu[] = [
    //Dashboard
    { title: 'Dashboard', path: 'dashboard/default', icon: 'home', type: 'link', active: true },

    //Products
    {
      title: 'Products', icon: 'box', type: 'menu', active: false, children: [
        {
          title: 'Manage', type: 'menu', active: false, children: [
            { title: 'Product List', type: 'link', path: 'products/manage/product-list' },
            { title: 'Add Product', type: 'link', path: 'products/manage/add-product' }
          ]
        }
      ]
    },
    //Sales
    {
      title: 'Sales', icon: 'dollor-sign', type: 'menu', active: false, children: [
        { title: 'Orders', type: 'link', path: 'sales/orders' },
        { title: 'Transactions', type: 'link', path: 'sales/transactions' }
      ]
    },
//Master

    {
      title: 'Masters', icon: 'clipboard', type: 'menu', active: false, children: [
        { title: 'BrandLogo', type: 'link', path: 'masters/brandlogo' },
        { title: 'Category', type: 'link', path: 'masters/category' },
        { title: 'Tag', type: 'link', path: 'masters/tag' },
        { title: 'Size', type: 'link', path: 'masters/size' },
        { title: 'Color', type: 'link', path: 'masters/color' },
        { title: 'Usertype', type: 'link', path: 'masters/usertype' },
      ]
    },

    //Users
    {
      title: 'Users', icon: 'user-plus', type: 'menu', active: false, children: [
        { title: 'User List', type: 'link', path: 'users/list-user' },
        { title: 'Add User', type: 'link', path: 'users/add-user' }
      ]
    },

    //Settings
    {
      title: 'Settings', icon: 'settings', type: 'menu', active: false, children: [
        { title: 'Profile', type: 'link', path: 'settings/profile' }
      ]
    },
    //Reports
    { title: 'Reports', path: 'reports', icon: 'bar-chart', type: 'link', active: false },
    //Invoice
    { title: 'Invoice', path: 'invoice', icon: 'archive', type: 'link', active: false },
    //Logout
    { title: 'Logout', path: 'auth/login', icon: 'log-out', type: 'link', active: false }
  ];

}
