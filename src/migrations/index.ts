import * as migration_20261113_170910_baseline from './20261113_170910_baseline';

export const migrations = [
  {
    up: migration_20261113_170910_baseline.up,
    down: migration_20261113_170910_baseline.down,
    name: '20261113_170910_baseline',
  },
];
