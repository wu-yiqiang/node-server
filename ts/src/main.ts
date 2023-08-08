import config from '@/config'
import {app} from '@/app'
import path = require('path')
app.listen(config.port, () => {
  console.log("start...", config.port, __dirname);
});