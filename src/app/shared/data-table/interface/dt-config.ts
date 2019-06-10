import { DtConfigSetting } from './dt-config-setting';
import { DtColumnSetting } from './dt-column-setting';

export interface DtConfig {
  configuration: Array<DtConfigSetting>;
  columns: Array<DtColumnSetting>;
  data?: Array<any>;
}
