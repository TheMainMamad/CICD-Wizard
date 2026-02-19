import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { generateYAML, downloadYAML } from './services/api';
import ProjectSection from './components/ProjectSection';
import BuildSection from './components/BuildSection';
import DeploySection from './components/DeploySection';
import AdditionalSection from './components/AdditionalSection';
import PreviewModal from './components/PreviewModal';
export default function App() {
    const [formData, setFormData] = useState({
        project_name: '',
        project_version: '1.0.0',
        service: 'Jenkins',
        app: 'Python',
        build: { language_version: '3.12', builder_tool: 'pip', full_command: 'pip install -r requirements.txt' },
        deploy: { ansible: false, project_path: '/opt/app', service_name: 'my-app' },
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [preview, setPreview] = useState(null);
    const handleProjectChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const handleBuildChange = (build) => {
        setFormData((prev) => ({ ...prev, build }));
    };
    const handleDeployChange = (deploy) => {
        setFormData((prev) => ({ ...prev, deploy }));
    };
    const handleAdditionalChange = (additional) => {
        setFormData((prev) => ({ ...prev, additional }));
    };
    const handlePreview = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await generateYAML(formData);
            setPreview(result);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate YAML');
        }
        finally {
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
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to download YAML');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100", children: [_jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-2", children: "CI/CD Wizard" }), _jsx("p", { className: "text-lg text-gray-600", children: "Generate production-ready CI/CD pipelines for your projects" })] }), error && (_jsx("div", { className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg", children: _jsxs("p", { className: "text-red-800 font-medium", children: ["Error: ", error] }) })), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsx(ProjectSection, { formData: formData, onChange: handleProjectChange }), _jsx(BuildSection, { formData: formData, onChange: handleBuildChange }), _jsx(DeploySection, { formData: formData, onChange: handleDeployChange }), _jsx(AdditionalSection, { formData: formData, onChange: handleAdditionalChange }), _jsxs("div", { className: "flex gap-4 pt-6 border-t border-gray-200", children: [_jsx("button", { onClick: handlePreview, disabled: loading || !formData.project_name, className: "flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition", children: loading ? 'Generating...' : 'Preview YAML' }), _jsx("button", { onClick: handleDownload, disabled: loading || !formData.project_name, className: "flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition", children: loading ? 'Downloading...' : 'Download File' })] })] }), _jsx("div", { className: "lg:col-span-1", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 sticky top-8", children: [_jsx("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Configuration Summary" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Project" }), _jsx("p", { className: "font-semibold text-gray-900", children: formData.project_name || 'Not set' })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Version" }), _jsx("p", { className: "font-semibold text-gray-900", children: formData.project_version })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Service" }), _jsx("p", { className: "font-semibold text-gray-900", children: formData.service })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "App Type" }), _jsx("p", { className: "font-semibold text-gray-900", children: formData.app })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Build Type" }), _jsx("p", { className: "font-semibold text-gray-900", children: formData.build && 'full_command' in formData.build ? 'Bare' : 'Docker' })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Deploy Type" }), _jsx("p", { className: "font-semibold text-gray-900", children: formData.deploy && 'yaml_path' in formData.deploy ? 'Docker Compose' :
                                                                'namespace' in formData.deploy ? 'Kubernetes' : 'Bare' })] })] })] }) })] })] }), preview && _jsx(PreviewModal, { data: preview, onClose: () => setPreview(null) })] }));
}
