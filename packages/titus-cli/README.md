# Titus CLI

## Installation

```
npm install -g @nearform/titus-cli
```

## Usage

```
titus starter <project-name>
```

Example

```
titus starter my-project
```

This pulls the latest version of titus starter shell from GitHub and copies it to a new subfolder of the current directory called `my-project/`

## Development

Install the dependencies using either npm or yarn

```
npm install
```

To use the local version of the cli in the command line we need to link it to our global packages and add the bin to our PATH.

```
npm link
```

NB. This doesn't work in yarn at the moment. There are several open issues about it, but it is not looking like something that will get resolved.
