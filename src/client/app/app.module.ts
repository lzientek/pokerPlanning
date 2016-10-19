import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }       from './app.routing';

import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { RoomComponent }   from './components/room/room.component';
import { JoinRoomComponent }   from './components/room/joinRoom.component';

import { RoomService }  from './services/room.service';
import { UserService }  from './services/user.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    ],
  declarations: [
    AppComponent,
    DashboardComponent,
    JoinRoomComponent,
    RoomComponent,
  ],
  providers: [
    RoomService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
