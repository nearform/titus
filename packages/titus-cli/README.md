# Titus CLI

A command line application to work with Titus

## Features

* `init` command to initialise a new Titus application.
* The ability to choose between a Titus application for the backend, frontend or both.

## Installation

```
npm install -g @nearform/titus-cli
```

If you'd prefer not to install the package globally you can use [`npx`](https://www.npmjs.com/package/npx) which comes bundled with npm 5.2.0 or later. You can use it like so:

```
npx @nearform/titus-cli init <project-name>
```

## Usage

```
titus init <project-name>
```

Example

```
titus init my-project
```

This pulls the latest version of titus starter shell from GitHub and copies it to a new subfolder of the current directory called `my-project/`

## Development

Install the dependencies using either npm or yarn:

```
npm install
```

To use the local version of the cli in the command line we need to link it to our global packages and add the bin to our PATH:

```
npm link
```

NB. This doesn't work in yarn at the moment. There are several open issues about it, but it is not looking like something that will get resolved.
