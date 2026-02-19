import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function AdditionalSection({ formData, onChange }) {
    const additional = formData.additional || {};
    const handleToggle = (feature) => {
        const updated = { ...additional };
        if (updated[feature]) {
            delete updated[feature];
        }
        else {
            if (feature === 'trivy') {
                updated.trivy = { enabled: true };
            }
            else if (feature === 'test') {
                updated.test = { command: 'npm test' };
            }
            else if (feature === 'lint') {
                updated.lint = { command: 'npm run lint' };
            }
            else if (feature === 'artifact_manager') {
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
    const handleFieldChange = (feature, field, value) => {
        const updated = { ...additional };
        if (updated[feature]) {
            updated[feature][field] = value;
        }
        onChange(updated);
    };
    return (_jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsx("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Additional CI/CD Features" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "border border-gray-200 rounded-lg p-4", children: [_jsxs("label", { className: "flex items-center mb-3", children: [_jsx("input", { type: "checkbox", checked: !!additional.test, onChange: () => handleToggle('test'), className: "mr-2" }), _jsx("span", { className: "font-semibold text-gray-900", children: "Automated Testing" })] }), additional.test && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Test Command" }), _jsx("input", { type: "text", value: additional.test.command, onChange: e => handleFieldChange('test', 'command', e.target.value), placeholder: "e.g., pytest tests/ --cov", className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] }))] }), _jsxs("div", { className: "border border-gray-200 rounded-lg p-4", children: [_jsxs("label", { className: "flex items-center mb-3", children: [_jsx("input", { type: "checkbox", checked: !!additional.lint, onChange: () => handleToggle('lint'), className: "mr-2" }), _jsx("span", { className: "font-semibold text-gray-900", children: "Code Linting" })] }), additional.lint && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Lint Command" }), _jsx("input", { type: "text", value: additional.lint.command, onChange: e => handleFieldChange('lint', 'command', e.target.value), placeholder: "e.g., pylint app/ && black --check .", className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] }))] }), _jsxs("div", { className: "border border-gray-200 rounded-lg p-4", children: [_jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: !!additional.trivy, onChange: () => handleToggle('trivy'), className: "mr-2" }), _jsx("span", { className: "font-semibold text-gray-900", children: "Trivy Security Scan" })] }), additional.trivy && (_jsx("p", { className: "text-sm text-gray-600 mt-2", children: "Security scanning enabled for container images" }))] }), _jsxs("div", { className: "border border-gray-200 rounded-lg p-4", children: [_jsxs("label", { className: "flex items-center mb-3", children: [_jsx("input", { type: "checkbox", checked: !!additional.artifact_manager, onChange: () => handleToggle('artifact_manager'), className: "mr-2" }), _jsx("span", { className: "font-semibold text-gray-900", children: "Artifact Manager" })] }), additional.artifact_manager && (_jsxs("div", { className: "space-y-3 mt-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Registry Host" }), _jsx("input", { type: "text", value: additional.artifact_manager.host, onChange: e => handleFieldChange('artifact_manager', 'host', e.target.value), placeholder: "registry.example.com", className: "w-full px-3 py-2 border border-gray-300 rounded-lg" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Image Name" }), _jsx("input", { type: "text", value: additional.artifact_manager.image_name, onChange: e => handleFieldChange('artifact_manager', 'image_name', e.target.value), placeholder: "my-app:latest", className: "w-full px-3 py-2 border border-gray-300 rounded-lg" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Username" }), _jsx("input", { type: "text", value: additional.artifact_manager.username || '', onChange: e => handleFieldChange('artifact_manager', 'username', e.target.value), placeholder: "ci-user", className: "w-full px-3 py-2 border border-gray-300 rounded-lg" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password/Token" }), _jsx("input", { type: "password", value: additional.artifact_manager.password || '', onChange: e => handleFieldChange('artifact_manager', 'password', e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full px-3 py-2 border border-gray-300 rounded-lg" })] })] }))] })] })] }));
}
