import propertyGroups from "stylelint-config-recess-order/groups";

export default {
  extends: ["stylelint-config-standard-scss"],

  plugins: ["stylelint-order"],

  rules: {
    "order/properties-order": propertyGroups.map((group) => ({
      ...group,
      emptyLineBefore: "always",
      noEmptyLineBetween: true,
    })),
    "media-feature-range-notation": null,
    "value-keyword-case": ["lower", { camelCaseSvgKeywords: true }],
    "color-hex-length": "long",
    "declaration-empty-line-before": null,
    "declaration-block-no-redundant-longhand-properties": null,
    "font-family-name-quotes": "always-unless-keyword",
    "declaration-no-important": true,
    "selector-class-pattern": [
      "^.[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$",
      {
        resolveNestedSelectors: true,
        message: "Expected class selector to match BEM CSS pattern.",
      },
    ],
  },
};
