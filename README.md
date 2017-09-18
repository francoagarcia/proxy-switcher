# Proxy Switcher
## Requirements
1. nodejs v6 en adelante

## Setup
1. set proxy config in `config.json`.

## Run
```bash
node app.js --help
node app.js on      # Set proxy on
node app.js off     # Set proxy off
```

Luego se modificarán los siguientes componentes:
- Git en `~/.gitconfig`.
- NPM en `~/.npmrc`.
- Curl en `~/.curlrc`.
    - En git-bash, además se ejecutará `alias curl=...` para que curl tome el proxy en cada ejecución.
    - En CMD, además se ejecutará `set HTTP_PROXY=...` para que curl tome el proxy en cada ejecución.
- Maven en `~/.m2/settings.xml`.
- Se habilitará/deshabilitará el proxy global de Windows.
