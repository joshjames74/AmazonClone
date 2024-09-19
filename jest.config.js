module.exports = {
    preset: "ts-jest",
    transform: {'^.+\\.ts$': 'ts-jest'},
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node'],
    globals: {
        "ts-jest": {
            isolatedModules: true,
        }
    }
}