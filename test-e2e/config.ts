import Memory from './memory';

export default {
    paths: ['test-e2e/features/*.feature'],
    require: ['test-e2e/step-definitions/*.ts', 'src/*.ts'],
    format: [
        '@qavajs/xunit-formatter:test-e2e/report.xml',
        '@qavajs/console-formatter'
    ],
    memory: new Memory(),
    parallel: 1,
    publishQuiet: true
}
