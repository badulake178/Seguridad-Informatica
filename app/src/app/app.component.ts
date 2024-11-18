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
      encriptar: false,
      algoritmo: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const { texto, encriptar, desencriptar, algoritmo } = this.form.value;

    if (encriptar) {
      if (algoritmo === '1') {
        this.respuesta = this.encriptacionService.encriptarAlgoritmo_1(texto);
      } else if (algoritmo === '2') {
        this.respuesta = this.encriptacionService.encriptarInversion(texto);
      }
    } else if (desencriptar) {
      if (algoritmo === '1') {
        this.respuesta = this.encriptacionService.desencriptarAlgoritmo_1(texto);
      } else if (algoritmo === '2') {
        this.respuesta = this.encriptacionService.desencriptarInversion(texto);
      }
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
