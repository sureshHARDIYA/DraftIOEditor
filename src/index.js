import PluginedDraftEditor from './PluginEditor';
import plugins from './plugins';

import './index.scss';

PluginedDraftEditor.plugins = plugins;
console.log('here is the initialization');
export default PluginedDraftEditor;
