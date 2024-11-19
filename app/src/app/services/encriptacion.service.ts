import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncriptacionService {

  private readonly abecedario = 'abcdefghijklmnñopqrstuvwxyz';

  // Algoritmo de Desplazamiento (Cifrado César)
  encriptarAlgoritmo_1(texto: string): string {
    return texto
      .split('')
      .map((char) => {
        const esMayuscula = char === char.toUpperCase();
        const letra = char.toLowerCase();
        const index = this.abecedario.indexOf(letra);

        if (index === -1) return char; // Si no es una letra, se deja igual

        // Primer nivel: cambiar extremo a extremo
        let nivel1Posicion = 27 - index;
        if (letra === 'n') nivel1Posicion = 14;
        const nivel1Letra = this.abecedario[nivel1Posicion - 1];

        // Segundo nivel: desplazar 3 posiciones hacia arriba (en reversa)
        const nivel2Posicion =
          ((nivel1Posicion - 3 + 27) % 27);
        const nivel2Letra = this.abecedario[nivel2Posicion - 1];

        return esMayuscula ? nivel2Letra.toUpperCase() : nivel2Letra;
        //return nivel1Letra;
      })
      .join('');
  }

  desencriptarAlgoritmo_1(texto: string): string {
    return texto
      .split('')
      .map((char) => {
        const esMayuscula = char === char.toUpperCase();
        const letra = char.toLowerCase();
        const index = this.abecedario.indexOf(letra);

        if (index === -1) return char; // Si no es una letra, se deja igual

        // Primer nivel: invertir el segundo nivel (desplazar 3 posiciones hacia abajo)
        const nivel1Posicion = ((index + 3) % 27) + 1;
        const nivel1Letra = this.abecedario[nivel1Posicion - 1];

        // Segundo nivel: invertir el cambio de extremo a extremo
        let nivel2Posicion = 27 - nivel1Posicion;
        if (nivel1Letra === 'n') nivel2Posicion = 13;
        const nivel2Letra = this.abecedario[nivel2Posicion];

        return esMayuscula ? nivel2Letra.toUpperCase() : nivel2Letra;
        //return nivel1Posicion - 1;
      })
      .join('');
  }


  // Algoritmo de Sustitución Invertida
  encriptarAlgoritmo_2(texto: string): string {
    return texto
      .split('')
      .map((char) => {
        const esMayuscula = char === char.toUpperCase();
        const letra = char.toLowerCase();
        const index = this.abecedario.indexOf(letra);

        // Primer nivel: cambiar extremo a extremo
        let nivel1Posicion = 27 - index;
        if (letra === 'n') nivel1Posicion = 14;
        const nivel1Letra = this.abecedario[nivel1Posicion - 1];


        return esMayuscula ? nivel1Letra.toUpperCase() : nivel1Letra;
        //return nivel1Letra;
      })
      .join('');
  }

  desencriptarAlgoritmo_2(texto: string): string {
    return texto
      .split('')
      .map((char) => {
        const esMayuscula = char === char.toUpperCase();
        const letra = char.toLowerCase();
        const index = this.abecedario.indexOf(letra);

        if (index === -1) return char; // Si no es una letra, se deja igual

        // Segundo nivel: invertir el cambio de extremo a extremo
        let nivel1Posicion = 27 - index;
        if (letra === 'n') nivel1Posicion = 13;
        const nivel1Letra = this.abecedario[nivel1Posicion - 1];

        return esMayuscula ? nivel1Letra.toUpperCase() : nivel1Letra;
        //return nivel1Posicion;
      })
      .join('');
  }
}
