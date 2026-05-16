module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
            useESM: true,
        }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@features/(.*)$': '<rootDir>/src/features/$1',
        '^@entities/(.*)$': '<rootDir>/src/entities/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
        '^@providers/(.*)$': '<rootDir>/src/app/providers/$1',
    },
};