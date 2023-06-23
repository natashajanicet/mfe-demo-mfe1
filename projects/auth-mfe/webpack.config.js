const {
  share,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

const test = withModuleFederationPlugin({
  name: "auth-mfe",

  exposes: {
    "./Module": "./projects/auth-mfe/src/app/auth/auth.module.ts",
  },

  shared: share({
    "@angular/core": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    },
    "@angular/common": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    },
    "@angular/common/http": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    },
    "@angular/router": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    },
    "@angular/material": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    },
    "@ngx-translate/core": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    },
    "@ngx-translate/http-loader": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    },
  }),
});

module.exports = {
  ...test,
  output: {
    publicPath: "http://localhost:4200/",
    uniqueName: "auth-mfe",
  },
};
