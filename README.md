# Maverick Authentication MFE

This application implements the micro frontend for authentication with module federation for BNI back office web application such as login

## Tools for Development

- Node
- Angular CLI
- Visual Studio Code
- Visual Studio Extensions
  - ESLint
  - Sonarlint
  - Prettier (_optional_)
  - GitLens (_optional_)

## Code Guideline

- Avoid using type `any`
- Use **Reactive Form** instead of **Template Driven Form**
- Indent the code using double spaces
- DRY (do not repeate yourself) as much as possible
- Write unit test for all possible **components**, **pipes**, **directives**, **utlis** with minimum total coverage of 70%
- Use **camelCase** for variables
- Use **SCSS** file for styling
- Fix all **SonarLint**, **ESLint** and **Unit Test** issues before raising merge request
  run commands to run eslint and unit test as defined on the **Commands** section
- Use **Angular Material** for components and **Bootstrap** for grid and responsive design

### Specific for Micro Front End

- Relative path to resources in assets like `<img src=/assets/...`, css of `background-image: url('/assets/...')`, and API call to assets folder (for translation) will not work in micro frontend to make it work:
  - Need to concatenate the assets url with the deployment URL of the micro frontend
    - The deployment URL can be obtained by calling `__webpack_public_path__` for example `imageSource = __webpack_public_path__ + 'assets/images/img1.jpg'`
    - To avoid compiling error need to put `declare var __webpack_public_path__: string;` in `declare.d.ts` in src folder
  - For SCSS need to pass the parameter
- As modules the are exposed are child modules instead of whole applications:

  - Global `styles.scss` wont be applied when embeded to the host application, to handle that:
    - `global-container.component` is created in `core.module`, this component should be used as the top parent in all components
    - as much as possible put the shared css styles on the `global-container.component.scss`
  - In every exposed module need to create separate loader for translation e.q:

  ```typescript
  import { NgModule } from "@angular/core";
  import { CommonModule } from "@angular/common";

  import { AuthRoutingModule } from "./auth-routing.module";
  import { LoginComponent } from "./components/login/login.component";
  import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
  import { TranslateHttpLoader } from "@ngx-translate/http-loader";
  import { HttpClient, HttpClientModule } from "@angular/common/http";
  import { CoreModule } from "../core/core.module";

  export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, `${__webpack_public_path__}assets/i18n/`, ".json");
  }

  @NgModule({
    declarations: [LoginComponent],
    imports: [
      CommonModule,
      AuthRoutingModule,
      HttpClientModule,
      CoreModule,
      TranslateModule.forChild({
        defaultLanguage: "id",
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
        isolate: true,
      }),
    ],
  })
  export class AuthModule {}
  ```

- To expose the module to the host application expose on the `webpack.config.js` as follows:

  ```typescript
  const { shareAll, withModuleFederationPlugin } = require("@angular-architects/module-federation/webpack");

  module.exports = withModuleFederationPlugin({
    name: "book-mfe",

    exposes: {
      "./BookModule": "./projects/book-mfe/src/app/book/book.module.ts",
    },

    shared: {
      ...shareAll({ singleton: true, strictVersion: true, requiredVersion: "auto" }),
    },
  });
  ```

## Folder Structure

- Put all text displayed on the HTML on `id.json` and `en.json` and use ngx-translate pipe
- Put arbitrary number or parameter on `constants` folder, eq: Regex, Min and Max validation
- For mapping with route update the `app.routing.ts` file
- Data or variables that differ for each environment should be put inside environment files in `environments` folder
- Request `.npmrc` file to install Maverick's Back Office private Angular library and put the file on the root folder of the application
- To add new pages to existing module create the component inside the `src/app/modules/<target_module/pages` and adjust the routing of the target module
- To add new module, create the module inside `src/app/modules/`, add routing to the app.routing for local test and expose the module in the `webpack.config.js` and adjust in host app
- For **shared resources**:
  - Shared between pages in one module: put it inside the module directory
  - Shared between modules in the same micro frontend: put it inside shared module and export, unless for service to call API placed the file inside `/core/services` folder
  - Shared between microfront end: put it in library, publish and npm install the new version
- For more detail on the folder structure refer to this link https://medium.com/@shijin_nath/angular-right-file-structure-and-best-practices-that-help-to-scale-2020-52ce8d967df5

## Commands

<!-- prettier-ignore-start -->
| Command | Description |
| ------ | ------ |
| `npm install` | To install the dependency packages |
| `ng generate component | directive | pipe | service | class | guard | interface | enum | module` | To generate component/ directive/ pipe / service, etc |
| `ng lint` | To run ESLint checking |
| `ng test` | To execute the unit tests via [Karma](https://karma-runner.github.io) |
| `ng serve` | To run the application locally and will read from `environment.ts` and `mf.manifest.json` |
| `ng serve --configuration development` | To run the application locally and will read from `environment.dev.ts` and `mf.manifest.dev.json` |
| `ng serve --configuration sit` | To run the application locally and will read from `environment.sit.ts` and `mf.manifest.sit.json` |
| `ng serve --configuration uat` | To run the application locally and will read from `environment.uat.ts` and `mf.manifest.uat.json` |
| `ng serve --configuration production` | To run the application locally and will read from `environment.prod.ts` and `mf.manifest.prod.json` |
| `ng build --configuration development` | To build the application and will read from `environment.dev.ts` and `mf.manifest.dev.json` |
| `ng buiild --configuration sit` | To build the application and will read from `environment.sit.ts` and `mf.manifest.sit.json` |
| `ng build --configuration uat` | To build the application and will read from `environment.uat.ts` and `mf.manifest.uat.json` |
| `ng build --configuration production` |To build the application and will read from `environment.prod.ts` and `mf.manifest.prod.json` |
<!-- prettier-ignore-end -->