import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BoardsService } from '@services/boards.service';

import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@services/auth.service';
import { Colors, NAVBAR_BACKGROUNDS } from '@models/colors.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreateBoard = false;

  user$ = this.authService.user$;
  navBarBackgroundColor: Colors = 'sky';
  navBarColors = NAVBAR_BACKGROUNDS

  constructor(
    private authService: AuthService,
    private router: Router,
    private boardService: BoardsService
  ) {
    this.boardService.backgroundColor.subscribe(color=>{
      this.navBarBackgroundColor = color;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  close(event : boolean){
    this.isOpenOverlayCreateBoard = event;
  }

  get colors (){
    const classes = this.navBarColors[this.navBarBackgroundColor];
    return classes ? classes : [];
  }

}
