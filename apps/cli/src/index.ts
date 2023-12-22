#!/usr/bin/env node

import { getComponentList } from './api';
import { init } from './main';

init().catch((e) => {
  console.error(e);
});
