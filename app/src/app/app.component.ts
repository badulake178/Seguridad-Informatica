import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncriptacionService } from './services/encriptacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  form: FormGroup;
  respuesta: string = ''; // Para almacenar el resultado de encriptación/desencriptación

  constructor(private fb: FormBuilder, private encriptacionService: EncriptacionService) {
    this.form = this.fb.group({
      texto: ['', Validators.required],
      desencriptar: false,
      encriptar: false
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const { texto, encriptar, desencriptar } = this.form.value;
    console.log(this.form.value);


    if (encriptar) {
      this.respuesta = this.encriptacionService.encriptarAlgoritmo_1(texto);
    } else if (desencriptar) {
      this.respuesta = this.encriptacionService.desencriptarAlgoritmo_1(texto);

    }
  }

  onCheckboxChange(selected: string) {
    if (selected === 'desencriptar') {
      this.form.patchValue({ encriptar: false });
    } else if (selected === 'encriptar') {
      this.form.patchValue({ desencriptar: false });
    }
  }
}
