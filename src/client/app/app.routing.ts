import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { RoomComponent }   from './components/room/room.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  // {
  //   path: '/start',
  //   component: DashboardComponent
  // },
  {
    path: 'session/:id',
    component: RoomComponent
  },
  {
    path: 'join/:id',
    component: RoomComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
