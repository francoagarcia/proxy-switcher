# Proxy Switcher for Windows
## Requirements
1. NodeJS +6

## Setup
1. Set proxy config in `config.json`.
2. `npm install`.

## Run
```bash
node proxy-switcher.js --help  # help (?)
node proxy-switcher.js on      # Set proxy on
node proxy-switcher.js off     # Set proxy off
```

## Docs
This script will:
- Enable/Disable the **global proxy of the system**. Always will be executed.
- If **git** is present in *programs array* in the `config.json`, will modify `~/.gitconfig`.
- If **npm** is present in *programs array* in the `config.json`, will modify `~/.npmrc`.
- If **maven** is present in *programs array* in the `config.json`, will modify `~/.m2/settings.xml`.
- If **curl** is present in *programs array* in the `config.json`, will modify `~/.curlrc`. In the curl case, also will:
    - create an alias in bash: `alias curl='curl --config --proxy ~/.curlrc'`.
    - set environment variables in windows cmd: `set HTTP_PROXY=...`.

All the programs available until now are located in the `/programs` directory. Each one has only 3 methods:
- `on(config)`.
- `off(config)`.
- `isEnabled(config)`.

The name of the file ***must be equals*** to the name setted in the *programs array* in the `config.json`.

You also can put your custom configuration for each program in the `config.json` adding an element in the root with the **same name of the app** (except the system program). For example, if you want to customize maven:

```json
{
    "proxy": {
        //...user proxy configuration
    },
    "programs" : [
        "maven"
    ],
    "maven" : {
        "command" : null,
        "configurationFile" : ""
    }
}
```