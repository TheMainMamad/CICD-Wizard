import { useState } from 'react';
import { WizardData, generateYAML, downloadYAML } from './services/api';
import ProjectSection from './components/ProjectSection';
import BuildSection from './components/BuildSection';
import DeploySection from './components/DeploySection';
import AdditionalSection from './components/AdditionalSection';
import PreviewModal from './components/PreviewModal';

export default function App() {
  const [formData, setFormData] = useState<WizardData>({
    project_name: '',
    project_version: '1.0.0',
    service: 'Jenkins',
    app: 'Python',
    build: { language_version: '3.12', builder_tool: 'pip', full_command: 'pip install -r requirements.txt' },
    deploy: { ansible: false, project_path: '/opt/app', service_name: 'my-app' },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<{ yaml: string; service: string; project: string; version: string } | null>(null);

  const handleProjectChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBuildChange = (build: any) => {
    setFormData(prev => ({ ...prev, build }));
  };

  const handleDeployChange = (deploy: any) => {
    setFormData(prev => ({ ...prev, deploy }));
  };

  const handleAdditionalChange = (additional: any) => {
    setFormData(prev => ({ ...prev, additional }));
  };

  const handlePreview = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await generateYAML(formData);
      setPreview(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate YAML');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    setError('');
    try {
      const yaml = await downloadYAML(formData);
      const element = document.createElement('a');
      const file = new Blob([yaml], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = formData.service === 'Jenkins' ? 'Jenkinsfile' : '.gitlab-ci.yml';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download YAML');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">CI/CD Wizard</h1>
          <p className="text-lg text-gray-600">Generate production-ready CI/CD pipelines for your projects</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">Error: {error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <ProjectSection formData={formData} onChange={handleProjectChange} />
            <BuildSection formData={formData} onChange={handleBuildChange} />
            <DeploySection formData={formData} onChange={handleDeployChange} />
            <AdditionalSection formData={formData} onChange={handleAdditionalChange} />

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handlePreview}
                disabled={loading || !formData.project_name}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                {loading ? 'Generating...' : 'Preview YAML'}
              </button>
              <button
                onClick={handleDownload}
                disabled={loading || !formData.project_name}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                {loading ? 'Downloading...' : 'Download File'}
              </button>
            </div>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Configuration Summary</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Project</p>
                  <p className="font-semibold text-gray-900">{formData.project_name || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Version</p>
                  <p className="font-semibold text-gray-900">{formData.project_version}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Service</p>
                  <p className="font-semibold text-gray-900">{formData.service}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">App Type</p>
                  <p className="font-semibold text-gray-900">{formData.app}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Build Type</p>
                  <p className="font-semibold text-gray-900">
                    {formData.build && 'full_command' in formData.build ? 'Bare' : 'Docker'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Deploy Type</p>
                  <p className="font-semibold text-gray-900">
                    {formData.deploy && 'yaml_path' in formData.deploy ? 'Docker Compose' : 
                     'namespace' in formData.deploy ? 'Kubernetes' : 'Bare'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {preview && <PreviewModal data={preview} onClose={() => setPreview(null)} />}
    </div>
  );
}
