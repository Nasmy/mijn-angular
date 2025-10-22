import { Routes } from '@angular/router';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { GeographicalSearchesModule } from './pages/geographical-searches/geographical-searches.module';
import { EnvironmentalPermitModule } from './pages/environmental-permits/environmental-permit.module';


export const route: Routes = [
  // Login Layout Routes
  {
    path: 'account',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./login/login.module').then(m => m.LoginModule), // Lazy load login module
      },
    ],
  },

  // Main Layout Routes
  {
    path: '',
    redirectTo: '/geographical-searches',
    pathMatch: 'full'
   /*  Previous route
   path: 'geographical-searches',
   component: MainLayoutComponent,
   children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
      },
      {
        path: 'geographical-searches',
        loadChildren: () =>
          import('./pages/geographical-searches/geographical-searches.module').then(m => m.GeographicalSearchesModule),
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('./pages/contacts/contacts.module').then(m => m.ContactsModule),
      },
      // Add more internal routes here...
    ],*/
  },
  {
      
        path: 'geographical-searches',
        component: MainLayoutComponent,
        children: [
         
          {
            path: '',
            loadChildren: () =>
              import('./pages/geographical-searches/geographical-searches.module').then(m => m.GeographicalSearchesModule),
          },         
        ]
  },
  { 
    path: 'contacts',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>import('./pages/contacts/contacts.module').then(m => m.ContactsModule),
      }
    ]
  },
  { 
    path: 'filemanagment',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>import('./pages/filemanagments/filemanagment.module').then(m=>m.FileManagmentModule),
      }
    ]
  },
  { 
    path: 'profile',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>import('./pages/user/user.module').then(m => m.UserModule),
      }
    ]
  },
  { 
    path: 'environmental-permits',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>import('./pages/environmental-permits/environmental-permit.module').then(m=>m.EnvironmentalPermitModule),
      }
    ]
  },


  
  { 
    path: 'error',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>import('./pages/errors/errors.module').then(m => m.ErrorsModule),
      }
    ]

  },

  


  // Redirect to the login page if the route is not found
  { path: '**', redirectTo: 'account', pathMatch: 'full' },
];
