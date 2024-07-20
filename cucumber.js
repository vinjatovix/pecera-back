const common = ['--require-module ts-node/register', '--require setupTests.ts'];

const pecera = [
  ...common,
  'tests/apps/pecera/features/**/*.feature',
  '--require tests/apps/pecera/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
  pecera
};
