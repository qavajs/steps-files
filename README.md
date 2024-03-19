# @qavajs/steps-files
Step library to work with file system

## Installation
`npm install @qavajs/steps-files`

## Configuration
```javascript
module.exports = {
    default: {
        require: [
            '@qavajs/steps-files/index.js'
        ],
        // add fileTimeout property in case you need to customize built-in interval and timeout
        fileTimeout: {
            interval: 1000,
            timeout: 1000
        }
    }
}
```
