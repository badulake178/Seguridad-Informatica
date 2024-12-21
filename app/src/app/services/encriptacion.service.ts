import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncriptacionService {

  private readonly abecedario = 'abcdefghijklmnñopqrstuvwxyz';
  private readonly numeros  = '1234567890';

  // Algoritmo de Desplazamiento (Cifrado César)
  encriptarAlgoritmo_1(texto: string): string {
    return texto
      .split('')
      .map((char) => {
        //si es una letra
        if (/[a-zñA-ZÑ]/.test(char)){
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

        }
        else if(/[0-9]/.test(char)){
          const indexNumero = this.numeros.indexOf(char);

          let nivel1PosicionNumero = 10 - indexNumero;
          const nivel1Numero = this.numeros[nivel1PosicionNumero-1];

          // Nivel 2: continuar con el desplazamiento hacia la derecha
          const nuevaPosicionNumero = (nivel1PosicionNumero-1 + 3) % 10;
          return this.numeros[nuevaPosicionNumero];
          //return nuevaPosicion;
        }
        return char;

      })
      .join('');
  }

  desencriptarAlgoritmo_1(texto: string): string {
    return texto
      .split('')
      .map((char) => {
        // Determinar si es una letra
        if (/[a-zñA-ZÑ]/.test(char)) {
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
        }

        // Determinar si es un número
        if (/[0-9]/.test(char)) {
          // Nivel 2: revertir el desplazamiento hacia la derecha (desplazar 3 posiciones hacia la izquierda)
          const indexNumero = this.numeros.indexOf(char);

          const nivel2PosicionNumero = (indexNumero - 3 + 10) % 10;

          // Nivel 1: revertir el cálculo del extremo
          const nivel1PosicionNumero = (10 - nivel2PosicionNumero);

          return this.numeros[nivel1PosicionNumero -1];
        }

        // Si no es letra ni número, se deja igual
        return char;
      })
      .join('');
  }
}
