# Frontend

Angular frontend of the CRUD App. It contains the **Users** page (connected to the Spring Boot API) and a small **Mini Shop** page that practices Angular components and data binding.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.8.

For the full project (backend, database, REST API), see the [main README](../README.md).

## Development server

```bash
npm install   # first time only
npm start     # or: ng serve
```

Open `http://localhost:4200/`. The application reloads automatically when you change a source file.

The users page needs the backend running on `http://localhost:8080`.

## Project structure

The frontend is organized **by feature**:

```
src/
├── app/
│   ├── features/
│   │   ├── users/
│   │   │   ├── components/
│   │   │   │   ├── user-form/
│   │   │   │   ├── user-list/
│   │   │   │   └── users-page/
│   │   │   ├── models/
│   │   │   └── services/
│   │   └── shop/
│   │       ├── components/
│   │       │   └── shop-page/
│   │       └── models/
│   ├── app.ts
│   ├── app.html
│   └── app.css
└── styles.css
```

- Code used by **one feature** stays inside that feature.
- Code used by **many features** goes to `shared/` (created when needed).
- Code that exists **once in the whole app** (for example auth) goes to `core/` (created when needed).

## Design rules

All pages use the same design from `src/styles.css`.

- Colors, radius, and shadow are CSS variables (`--primary`, `--accent`, `--bg`, ...). Do not write new color codes inside a component.
- A section is a `.card` inside a `.page`.
- Buttons: plain `button` for the main action, `button.secondary` for a secondary action, `button.danger` for a dangerous action.
- Messages use `.msg`, `.msg.ok`, and `.msg.warn`.
- A component's CSS file contains only the layout that is special to that component.

## Code scaffolding

Create a component inside a feature by giving the full path:

```bash
ng generate component features/<feature>/components/<component-name>
```

For a list of all available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

```bash
ng build
```

The build output is stored in the `dist/` directory. Run `ng build` before every push, to be sure the project compiles.

## Running unit tests

Unit tests run with the [Vitest](https://vitest.dev/) test runner:

```bash
ng test
```

## Additional resources

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
