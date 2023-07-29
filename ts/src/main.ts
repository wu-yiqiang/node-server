import config from './config'
import {app} from './app'

app.listen(config.port, () => {
  console.log("start...", config.port);
});