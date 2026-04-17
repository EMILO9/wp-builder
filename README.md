# wp-builder

A lightweight CLI and build tool for WordPress development workflows.

## Features

- CLI Tool: Easy-to-use command-line interface for WordPress development tasks
- Build Tool: Powerful build system using Vite for modern WordPress development
- Template Engine: Handlebars support for dynamic template generation
- Configuration: Flexible configuration using cosmiconfig
- Type Safe: Built entirely in TypeScript with full type safety
- Automation: Streamline your WordPress development workflows

## Installation

npm install -g wp-builder

Or install as a dev dependency:

npm install --save-dev wp-builder

## Usage

### CLI

wp-builder [command] [options]

For available commands and options, run:

wp-builder --help

### As a Library

import { /_ your exports _/ } from 'wp-builder';

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

npm install

### Build

npm run build

### Testing

npm test

### Type Checking

npm run attw

## Project Structure

- dist/ - Compiled output (CLI and library)
- src/ - Source code
- tests/ - Test files and fixtures

## Configuration

wp-builder uses cosmiconfig for configuration. You can create a configuration file in any of these formats:

- .wp-builderrc
- .wp-builderrc.json
- .wp-builderrc.yaml
- .wp-builderrc.yml
- .wp-builderrc.js
- .wp-builderrc.cjs
- wp-builder.config.js
- wp-builder.config.cjs

## Scripts

- npm run build - Build the project with tsdown
- npm run attw - Check type definitions
- npm run test - Run tests with Vitest
- npm run pretest - Build before running tests

## License

MIT © 2026 EMILO9
