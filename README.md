# Calculadora de diferencias

[![hexlet-check](https://github.com/Andx23/frontend-project-103/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Andx23/frontend-project-103/actions)

[![Tests](https://github.com/Andx23/frontend-project-103/actions/workflows/tests.yml/badge.svg)](https://github.com/Andx23/frontend-project-103/actions/workflows/tests.yml)

Aprenderás a crear aplicaciones de línea de comandos (CLI), analizar y formatear datos en JSON y YAML. Además, explorarás el diseño de la arquitectura de aplicaciones y la escritura de pruebas unitarias.

Proyecto de aprendizaje de Códica: https://app.codica.la/programs/frontend
Así debería funcionar: https://asciinema.org/a/Pe6QypnLEmFWssNAjCOJN1iii

## Stack

- JavaScript

## Instalación

<!-- Describa la instalación: clonación, dependencias, variables de entorno -->

```bash
git clone https://github.com/Andx23/frontend-project-103.git
cd frontend-project-103
npm install
```

## Uso

<!-- Agregue ejemplos de ejecución y una grabación de asciinema: esto es lo que miran los empleadores -->

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

### Demostración

[![asciicast](https://asciinema.org/a/FsFKxx0EdGQbGI1e.svg)](https://asciinema.org/a/FsFKxx0EdGQbGI1e)

---

<details>
<summary>Pruebas automáticas de Códica</summary>

Las pruebas se ejecutan en cada commit. El archivo `.github/workflows/hexlet-check.yml` es el responsable de ejecutarlas: no lo elimine ni lo renombre, y no cambie el nombre del repositorio.

</details>

## Acerca de Códica

[Códica](https://app.codica.la/) es una escuela de programación: programas de aprendizaje propios con práctica, apoyo de mentores y proyectos reales que quedan en su currículum. Este repositorio es uno de esos proyectos.