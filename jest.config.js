module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ['<rootDir>/src'],

    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/node_modules/jest-css-modules-transform',
    },

    //A dds special extended assertions to Jest
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: '/__tests__/.*\\.test\\.tsx?$',

    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // Exclude paths from coverage reporting
    coveragePathIgnorePatterns: ['/node_modules/', '/src/__test__/', '.*.d.ts', '/src/stories/', '.*/index.ts', '.*.stories.tsx'],
    // Minimum test coverage threshold
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    // Only collect coverage for components
    collectCoverageFrom: ['src/components/**/*.{ts,tsx}'],
};
