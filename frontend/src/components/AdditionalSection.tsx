import { WizardData } from '../services/api';

interface Props {
  formData: WizardData;
  onChange: (additional: any) => void;
}

export default function AdditionalSection({ formData, onChange }: Props) {
  const additional = formData.additional || {};

  const handleToggle = (feature: string) => {
    const updated = { ...additional };
    if (updated[feature as keyof typeof additional]) {
      delete updated[feature as keyof typeof additional];
    } else {
      if (feature === 'trivy') {
        updated.trivy = {};
      } else if (feature === 'test') {
        updated.test = { command: 'npm test' };
      } else if (feature === 'lint') {
        updated.lint = { command: 'npm run lint' };
      } else if (feature === 'artifact_manager') {
        updated.artifact_manager = {
          host: 'artifactory.example.com',
          image_name: 'app:latest',
          username: '',
          password: ''
        };
      }
    }
    onChange(updated);
  };

  const handleFieldChange = (feature: string, field: string, value: string) => {
    const updated = { ...additional };
    if (updated[feature as keyof typeof additional]) {
      (updated[feature as keyof typeof additional] as any)[field] = value;
    }
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Additional CI/CD Features</h2>

      {/* Feature Toggles */}
      <div className="space-y-4">
        {/* Testing */}
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={!!additional.test}
              onChange={() => handleToggle('test')}
              className="mr-2"
            />
            <span className="font-semibold text-gray-900">Automated Testing</span>
          </label>
          {additional.test && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Test Command</label>
              <input
                type="text"
                value={additional.test.command}
                onChange={e => handleFieldChange('test', 'command', e.target.value)}
                placeholder="e.g., pytest tests/ --cov"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Linting */}
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={!!additional.lint}
              onChange={() => handleToggle('lint')}
              className="mr-2"
            />
            <span className="font-semibold text-gray-900">Code Linting</span>
          </label>
          {additional.lint && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lint Command</label>
              <input
                type="text"
                value={additional.lint.command}
                onChange={e => handleFieldChange('lint', 'command', e.target.value)}
                placeholder="e.g., pylint app/ && black --check ."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Security Scanning */}
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={!!additional.trivy}
              onChange={() => handleToggle('trivy')}
              className="mr-2"
            />
            <span className="font-semibold text-gray-900">Trivy Security Scan</span>
          </label>
          {additional.trivy && (
            <p className="text-sm text-gray-600 mt-2">Security scanning enabled for container images</p>
          )}
        </div>

        {/* Artifact Manager */}
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={!!additional.artifact_manager}
              onChange={() => handleToggle('artifact_manager')}
              className="mr-2"
            />
            <span className="font-semibold text-gray-900">Artifact Manager</span>
          </label>
          {additional.artifact_manager && (
            <div className="space-y-3 mt-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registry Host</label>
                <input
                  type="text"
                  value={additional.artifact_manager.host}
                  onChange={e => handleFieldChange('artifact_manager', 'host', e.target.value)}
                  placeholder="registry.example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Name</label>
                <input
                  type="text"
                  value={additional.artifact_manager.image_name}
                  onChange={e => handleFieldChange('artifact_manager', 'image_name', e.target.value)}
                  placeholder="my-app:latest"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={additional.artifact_manager.username || ''}
                  onChange={e => handleFieldChange('artifact_manager', 'username', e.target.value)}
                  placeholder="ci-user"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password/Token</label>
                <input
                  type="password"
                  value={additional.artifact_manager.password || ''}
                  onChange={e => handleFieldChange('artifact_manager', 'password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
