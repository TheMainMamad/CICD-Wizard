import { WizardData } from '../services/api';

interface Props {
  formData: WizardData;
  onChange: (field: string, value: any) => void;
}

export default function ProjectSection({ formData, onChange }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Project Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
          <input
            type="text"
            value={formData.project_name}
            onChange={e => onChange('project_name', e.target.value)}
            placeholder="e.g., my-app"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Version *</label>
          <input
            type="text"
            value={formData.project_version}
            onChange={e => onChange('project_version', e.target.value)}
            placeholder="e.g., 1.0.0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CI/CD Service *</label>
          <select
            value={formData.service}
            onChange={e => onChange('service', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Jenkins">Jenkins</option>
            <option value="Gitlab">GitLab CI</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Application Type *</label>
          <select
            value={formData.app}
            onChange={e => onChange('app', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Python">Python</option>
            <option value="PHP">PHP</option>
            <option value="Java">Java</option>
          </select>
        </div>
      </div>
    </div>
  );
}
