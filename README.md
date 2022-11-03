# @qavajs/steps-files
Step library to work with file system

## installation
`npm install @qavajs/steps-files`

## configuration
```javascript
module.exports = {
    default: {
        require: [
            '@qavajs/steps-files'
        ],
        // add fileTimeout property in case you need to customize built-in interval and timeout
        fileTimeout: {
            interval: 1000,
            timeout: 1000
        }
    }
}
```
