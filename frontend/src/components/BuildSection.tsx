import { WizardData } from '../services/api';

interface Props {
  formData: WizardData;
  onChange: (build: any) => void;
}

export default function BuildSection({ formData, onChange }: Props) {
  const isBare = 'full_command' in formData.build;

  const handleBuildTypeChange = (type: 'bare' | 'docker') => {
    if (type === 'bare') {
      onChange({
        language_version: '3.12',
        builder_tool: 'pip',
        full_command: 'pip install -r requirements.txt'
      });
    } else {
      onChange({
        required_base_image: 'python:3.12-slim',
        required_arguments: '',
        dockerfile_name: 'Dockerfile'
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Build Configuration</h2>

      {/* Build Type Selector */}
      <div className="mb-6 flex gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            checked={isBare}
            onChange={() => handleBuildTypeChange('bare')}
            className="mr-2"
          />
          <span>Bare Build</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            checked={!isBare}
            onChange={() => handleBuildTypeChange('docker')}
            className="mr-2"
          />
          <span>Docker Build</span>
        </label>
      </div>

      {isBare ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language Version</label>
            <input
              type="text"
              value={(formData.build as any).language_version}
              onChange={e => onChange({ ...formData.build, language_version: e.target.value })}
              placeholder="e.g., 3.12"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Builder Tool</label>
            <input
              type="text"
              value={(formData.build as any).builder_tool}
              onChange={e => onChange({ ...formData.build, builder_tool: e.target.value })}
              placeholder="e.g., pip, poetry, maven"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Build Command *</label>
            <input
              type="text"
              value={(formData.build as any).full_command}
              onChange={e => onChange({ ...formData.build, full_command: e.target.value })}
              placeholder="e.g., pip install -r requirements.txt"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Base Image *</label>
            <input
              type="text"
              value={(formData.build as any).required_base_image}
              onChange={e => onChange({ ...formData.build, required_base_image: e.target.value })}
              placeholder="e.g., python:3.12-slim"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Build Arguments</label>
            <input
              type="text"
              value={(formData.build as any).required_arguments || ''}
              onChange={e => onChange({ ...formData.build, required_arguments: e.target.value })}
              placeholder="e.g., --build-arg ENV=production"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dockerfile Name</label>
            <input
              type="text"
              value={(formData.build as any).dockerfile_name || 'Dockerfile'}
              onChange={e => onChange({ ...formData.build, dockerfile_name: e.target.value })}
              placeholder="Dockerfile"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
}
