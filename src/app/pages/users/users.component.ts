import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/services.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  offset: number = 0;
  totalRegs: number = 0;
  loading: boolean = true;

  constructor(
    private _userService: UserService,
    private _modalUplodService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadUsers();

    // Nos suscribimos a cualquier cambio en el sistema de notificaciones
    this._modalUplodService.notification.subscribe((result) => {
      this.loadUsers();
    });
  }

  showModal(id: string) {
    this._modalUplodService.showModal('users', id);
  }

  loadUsers() {
    // Loading...
    this.loading = true;

    this._userService.getUsers(this.offset).subscribe((result: any) => {
      this.totalRegs = result.total;
      this.users = result.usuarios;
      this.loading = false;
    });
  }

  searchUsers(key: string) {
    if (key.length <= 0) {
      this.loadUsers();
      return;
    }

    this.loading = true;

    this._userService.searchUsers(key).subscribe((response) => {
      console.log(response);
      this.users = response;
      this.loading = false;
    });
  }

  updateUser(user: User) {
    this._userService.updateUser(user).subscribe((result) => {
    });
  }

  deleteUser(user: User) {

    if (user._id === this._userService.user._id) {
      swal('Error eliminando usuario', 'No se puede eliminar a si mismo', 'error');
      return;
    }

    swal({
      title: 'Estas seguro?',
      text: 'Una vez eliminado no podra deshacer la accion',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((confirm) => {
      if (confirm) {
        this._userService.removeUser(user._id).subscribe((result) => {
          this.offset = 0;
          this.loadUsers();
        });
      }
    });
  }

  nextPage() {
    if (this.offset < (this.totalRegs - 5)) {
      this.offset = this.offset + 5;
      this.loadUsers();
    }
  }

  previousPage() {
    if (this.offset >= 5) {
      this.offset = this.offset - 5;
      this.loadUsers();
    }
  }
}
