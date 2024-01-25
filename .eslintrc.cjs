module.exports = {
    env: {
        browser: true,
        node: true,
    },
    plugins: [
        "@typescript-eslint",
        "@stylistic",
        "react",
        "react-native",
    ],
    extends: [
        "plugin:@stylistic/recommended-extends",
        "plugin:react/recommended",
        "eslint:recommended",
    ],
    parser: "@typescript-eslint/parser",
    overrides: [
        {
            env: {
                node: true,
            },
            files: [
                ".eslintrc.{js,cjs}",
            ],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: "module",
    },
    rules: {
        "@stylistic/quotes": ["warn", "double", { avoidEscape: true }],
        "@stylistic/semi": ["warn", "always"],
        "@stylistic/indent": ["warn", 4],
        "@stylistic/jsx-indent": ["warn", 4],
        "@stylistic/member-delimiter-style": ["warn", { multiline: { delimiter: "semi" } }],
        "@stylistic/brace-style": ["warn", "1tbs"],
        // "@typescript-eslint/explicit-function-return-type": 0,
        // "@typescript-eslint/indent": 0,
        // "@typescript-eslint/space-before-function-paren": 0,
        // "@typescript-eslint/keyword-spacing": 0,
        // "@typescript-eslint/comma-dangle": 0,
        "react-native/no-unused-styles": 1,
        "react-native/split-platform-components": 2,
        "react-native/no-inline-styles": 0,
        "react-native/no-color-literals": 0,
        "react-native/no-raw-text": 2,
        "react-native/no-single-element-style-arrays": 2,
    },
};
