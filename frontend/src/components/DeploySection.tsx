import { WizardData } from '../services/api';

interface Props {
  formData: WizardData;
  onChange: (deploy: any) => void;
}

export default function DeploySection({ formData, onChange }: Props) {
  const deployType = 
    'yaml_path' in formData.deploy ? 'docker-compose' :
    'namespace' in formData.deploy ? 'kubernetes' : 'bare';

  const handleDeployTypeChange = (type: 'bare' | 'docker-compose' | 'kubernetes') => {
    if (type === 'bare') {
      onChange({
        ansible: false,
        project_path: '/opt/app',
        service_name: 'my-app'
      });
    } else if (type === 'docker-compose') {
      onChange({
        yaml_path: '/etc/docker/compose',
        yaml_name: 'docker-compose.yml',
        graceful: true
      });
    } else {
      onChange({
        namespace: 'default',
        yaml_name: 'k8s-deployment.yaml',
        rolling_update: true
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Deployment Configuration</h2>

      {/* Deploy Type Selector */}
      <div className="mb-6 flex flex-wrap gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            checked={deployType === 'bare'}
            onChange={() => handleDeployTypeChange('bare')}
            className="mr-2"
          />
          <span>Bare Server</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            checked={deployType === 'docker-compose'}
            onChange={() => handleDeployTypeChange('docker-compose')}
            className="mr-2"
          />
          <span>Docker Compose</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            checked={deployType === 'kubernetes'}
            onChange={() => handleDeployTypeChange('kubernetes')}
            className="mr-2"
          />
          <span>Kubernetes</span>
        </label>
      </div>

      {deployType === 'bare' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Path *</label>
            <input
              type="text"
              value={(formData.deploy as any).project_path}
              onChange={e => onChange({ ...formData.deploy, project_path: e.target.value })}
              placeholder="/opt/app"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
            <input
              type="text"
              value={(formData.deploy as any).service_name}
              onChange={e => onChange({ ...formData.deploy, service_name: e.target.value })}
              placeholder="my-app"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={(formData.deploy as any).reload_enabled || false}
                onChange={e => onChange({ ...formData.deploy, reload_enabled: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Enable Reload</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deploy Commands</label>
            <textarea
              value={(formData.deploy as any).commands_to_execute || ''}
              onChange={e => onChange({ ...formData.deploy, commands_to_execute: e.target.value })}
              placeholder="systemctl restart my-app"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      ) : deployType === 'docker-compose' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YAML Path *</label>
            <input
              type="text"
              value={(formData.deploy as any).yaml_path}
              onChange={e => onChange({ ...formData.deploy, yaml_path: e.target.value })}
              placeholder="/etc/docker/compose"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YAML File Name</label>
            <input
              type="text"
              value={(formData.deploy as any).yaml_name || 'docker-compose.yml'}
              onChange={e => onChange({ ...formData.deploy, yaml_name: e.target.value })}
              placeholder="docker-compose.yml"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={(formData.deploy as any).graceful || false}
              onChange={e => onChange({ ...formData.deploy, graceful: e.target.checked })}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Graceful Shutdown</span>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Namespace</label>
            <input
              type="text"
              value={(formData.deploy as any).namespace || 'default'}
              onChange={e => onChange({ ...formData.deploy, namespace: e.target.value })}
              placeholder="default"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YAML File Name *</label>
            <input
              type="text"
              value={(formData.deploy as any).yaml_name}
              onChange={e => onChange({ ...formData.deploy, yaml_name: e.target.value })}
              placeholder="k8s-deployment.yaml"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={(formData.deploy as any).rolling_update ?? true}
              onChange={e => onChange({ ...formData.deploy, rolling_update: e.target.checked })}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Rolling Update</span>
          </label>
        </div>
      )}
    </div>
  );
}
