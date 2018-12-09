# Essboard

Essboard client build with [Angular CLI](https://github.com/angular/angular-cli).

## Development

Turn on the core & kernel apps first, then run:

```bash
$ npm run dev
# or
$ docker build -t essboard-client .
```

## Tips

#### Formatting

We use Prettier as our formatting tool, to have a formatting standard.

If you want to use prettier in an existing project, it's recommended to format your entire project for the first time, by running:

`./node_modules/.bin/prettier --single-quote --write "src/**/*.{js,jsx,ts,tsx,json,css,scss,md,html}"`

#### Editor

We use VS code as our main editor. If you use it, when you clone this repo, VS code will ask you to install our recommended extensions. Please install them, it'll help you in your development 😄

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
