import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncriptacionService {

  // Algoritmo de Desplazamiento (Cifrado César)
  encriptarDesplazamiento(texto: string, desplazamiento: number = 3): string {
    return texto
      .split('')
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const base = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(((code - base + desplazamiento) % 26) + base);
        }
        return char;
      })
      .join('');
  }

  desencriptarDesplazamiento(texto: string, desplazamiento: number = 3): string {
    return this.encriptarDesplazamiento(texto, 26 - desplazamiento);
  }

  // Algoritmo de Sustitución Invertida
  encriptarInversion(texto: string): string {
    return texto
      .split('')
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const base = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(base + (25 - (code - base)));
        }
        return char;
      })
      .join('');
  }

  desencriptarInversion(texto: string): string {
    return this.encriptarInversion(texto); // En este caso, es simétrico
  }
}
