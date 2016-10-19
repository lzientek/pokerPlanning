import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomComponent } from './components/room/room.component';
import { JoinRoomComponent } from './components/room/joinRoom.component';

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
    path: 'room/:id',
    component: RoomComponent
  },
  {
    path: 'join/:id',
    component: JoinRoomComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
