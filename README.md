# Proxy Switcher for Windows
## Requirements
1. nodejs v6 en adelante

## Setup
1. set proxy config in `config.json`.
2. `npm install`

## Run
```bash
node proxy-switcher.js --help  # help (?)
node proxy-switcher.js on      # Set proxy on
node proxy-switcher.js off     # Set proxy off
```

Luego se modificarán los siguientes componentes:
- Se habilitará/deshabilitará el proxy global de Windows.
- Git en `~/.gitconfig`.
- NPM en `~/.npmrc`.
- Curl en `~/.curlrc`.
    - En git-bash, además se ejecutará `alias curl=...` para que curl tome el proxy en cada ejecución.
    - En CMD, además se ejecutará `set HTTP_PROXY=...` para que curl tome el proxy en cada ejecución.
- Maven en `~/.m2/settings.xml`.
