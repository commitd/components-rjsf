<h1 align="center"> Committed Components RJSF </h1>
<br>
<p align="center">
  <img src="https://committed.io/Logo.svg" width="128px" alt="Project Logo"/>
</p>
<p align="center">
  React JSON Schema Forms for Committed Components
</p>

[![Committed Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fcommitted.io%2Fbadge)](https://committed.io)
![Build Status](https://github.com/commitd/components/workflows/build/badge.svg?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=commitd_components-rjsf&metric=alert_status&token=aa002ca75e2f3a6d028af9074bceeda1ffa2f9f7)](https://sonarcloud.io/dashboard?id=commitd_components)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=commitd_components-rjsf&metric=coverage&token=aa002ca75e2f3a6d028af9074bceeda1ffa2f9f7)](https://sonarcloud.io/dashboard?id=commitd_components-rjsf)
![GitHub repo size](https://img.shields.io/github/repo-size/commitd/components-rjsf)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://committed.software/components-rjsf)

For documentation see https://jsonforms.committed.software

## 💻 Development

The main build is performed using `esbuild`:

```bash
npm run build
```

We use storybook to develop and document the components, this is run in development using

```bash
npm run storybook
```

## 📦 Dev Containers

This project contains a [VSCode Dev Container Configuration](https://code.visualstudio.com/docs/remote/containers).

To use this, you must install the [VSCode Remote Container Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

Once this is installed, you should be prompted (when opening the project in it's root directory) to `Reopen in Container`. If this prompt does not appear, open the Command Palette and run `Remote Containers: Rebuild and Reopen in Container`.

This will re-open the project, with the project files mounted in a Docker container, which will include all the VSCode extensions from the dev container (e.g. useful extensions, formatters etc).

## 🤖 CI

Pull requests go through CI checks using Github Actions. Releases update the deployed documentation and update the package in the NPM registry.

## 📃 License

[MIT](/LICENSE) - © Committed Software 2020-2022 https://committed.io
