import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from '../../Entity/User';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  users!: User[];

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  showModalConfirmDeleteRegister = false;
  showModalUpdateInfoUser = false;

  async getAllUser() {
    this.userService.getAllUsers().subscribe({
      next: (success: User[]) => {
        const array: User[] = success;
        this.users = array;
      },
      error: (error) => {
        if (error.status === 400) {
          console.log(error);

          // this.confirmEmail = false;
        }

        // if (error.status !== 400) {
        //   localStorage.removeItem('user');
        //   this.router.navigate(['/login'], {
        //     queryParams: { changePassword: false },
        //   });
        // }
      },
    });
  }

  whichRegisterDelete: User | null = null;

  onCLickShowModalDeleteRegister(item: User) {
    this.showModalConfirmDeleteRegister = true;
    this.whichRegisterDelete = item;
  }

  onClickUpdateRegister(item: User) {
    this.showModalUpdateInfoUser = true;
    this.whichRegisterDelete = item;

    this.renderFormFields();
  }

  onClickCancelDeletion() {
    this.showModalConfirmDeleteRegister = false;
    this.whichRegisterDelete = null;
  }

  form!: FormGroup;
  submitted = false;

  onClickCancelUpdate() {
    this.submitted = false;
    this.form.reset();

    this.showModalUpdateInfoUser = false;
    this.whichRegisterDelete = null;
  }

  onCLickDeleteRegister() {
    if (!this.whichRegisterDelete?.Id) return;
    const idUser = this.whichRegisterDelete?.Id;

    this.userService.deleteUser(idUser).subscribe({
      next: (success: User) => {
        const obj: User = success;

        // this.users = array;
        this.users = this.users.filter((el) => el.Id !== idUser);
        this.showModalConfirmDeleteRegister = false;
        this.whichRegisterDelete = null;
      },
      error: (error) => {
        if (error.status === 400) {
          console.log(error);

          // this.confirmEmail = false;
        }

        // if (error.status !== 400) {
        //   localStorage.removeItem('user');
        //   this.router.navigate(['/login'], {
        //     queryParams: { changePassword: false },
        //   });
        // }
      },
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // onCLickUpdateRegister() {}

  renderFormFields() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const obj = this.form.value;
    const id = this.whichRegisterDelete?.Id;

    if (id === undefined) return;

    const user: User = {
      Id: id,
      Nome: obj.nome,
      Email: obj.email,
      CreateAt: '',
      PasswordHash: '',
    };

    this.userService.update(user).subscribe({
      next: (success: User) => {
        const obj: User = success;

        // this.users = array;
        const users = this.users.map((el) => {
          if (el.Id === id) {
            return { ...el, Nome: user.Nome, Email: user.Email };
          }

          return el;
        });

        this.users = users;
        this.showModalUpdateInfoUser = false;
        this.whichRegisterDelete = null;
      },
      error: (error) => {
        if (error.status === 400) {
          console.log(error);
        }
      },
    });

    // console.log(user);
  }
}
