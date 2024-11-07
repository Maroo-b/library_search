// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: "jsdom",
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Transforms TypeScript files, including JSX syntax
    },
  
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
      "^.+\\.svg$": "jest-transformer-svg",
    },
  
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  };

export default config;
