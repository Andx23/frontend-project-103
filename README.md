# Calculadora de diferencias

[![hexlet-check](https://github.com/Andx23/frontend-project-103/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Andx23/frontend-project-103/actions)

[![Tests](https://github.com/Andx23/frontend-project-103/actions/workflows/tests.yml/badge.svg)](https://github.com/Andx23/frontend-project-103/actions/workflows/tests.yml)

AprenderÃ¡s a crear aplicaciones de lÃ­nea de comandos (CLI), analizar y formatear datos en JSON y YAML. AdemÃ¡s, explorarÃ¡s el diseÃ±o de la arquitectura de aplicaciones y la escritura de pruebas unitarias.

Proyecto de aprendizaje de CÃ³dica: https://app.codica.la/programs/frontend
AsÃ­ deberÃ­a funcionar: https://asciinema.org/a/Pe6QypnLEmFWssNAjCOJN1iii

## Stack

- JavaScript

## InstalaciÃ³n

<!-- Describa la instalaciÃ³n: clonaciÃ³n, dependencias, variables de entorno -->

```bash
git clone https://github.com/Andx23/frontend-project-103.git
cd frontend-project-103
npm install
```

## Uso

<!-- Agregue ejemplos de ejecuciÃ³n y una grabaciÃ³n de asciinema: esto es lo que miran los empleadores -->

```bash
node gendiff.js file1.json file2.json
```

Resultado:

```text
{
  - follow: false
    host: codica.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

### DemostraciÃ³n

[![asciicast](https://asciinema.org/a/UduUfwGwDNeFxHde.svg)](https://asciinema.org/a/UduUfwGwDNeFxHde)

---

<details>
<summary>Pruebas automÃ¡ticas de CÃ³dica</summary>

Las pruebas se ejecutan en cada commit. El archivo `.github/workflows/hexlet-check.yml` es el responsable de ejecutarlas: no lo elimine ni lo renombre, y no cambie el nombre del repositorio.

</details>

## Acerca de CÃ³dica

[CÃ³dica](https://app.codica.la/) es una escuela de programaciÃ³n: programas de aprendizaje propios con prÃ¡ctica, apoyo de mentores y proyectos reales que quedan en su currÃ­culum. Este repositorio es uno de esos proyectos.
