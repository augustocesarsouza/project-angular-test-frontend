import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-create-user-component',
  standalone: false,
  templateUrl: './form-create-user-component.html',
  styleUrl: './form-create-user-component.css',
})
export class FormCreateUserComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmaSenha: ['', Validators.required],
      },
      {
        validators: this.matchPasswords('senha', 'confirmaSenha'),
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  userCreatedSucessfully = false;

  async onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const obj = this.form.value;
    const user = {
      name: obj.nome,
      email: obj.email,
      password: obj.senha,
    };

    const res = await fetch(`http://localhost:3000/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (res.status === 201) {
      this.userCreatedSucessfully = true;
    }

    console.log(user);
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

  matchPasswords(senhaKey: string, confirmaKey: string) {
    return (group: AbstractControl) => {
      const senha = group.get(senhaKey)?.value;
      const confirmaSenha = group.get(confirmaKey)?.value;

      if (senha !== confirmaSenha) {
        group.get(confirmaKey)?.setErrors({ mismatch: true });

        return { mismatch: true };
      }

      return null;
    };
  }
}
