interface Props {
  data: {
    yaml: string;
    service: string;
    project: string;
    version: string;
  };
  onClose: () => void;
}

export default function PreviewModal({ data, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-96 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{data.service} Pipeline</h3>
            <p className="text-sm text-gray-600">{data.project} v{data.version}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* YAML Content */}
        <div className="overflow-auto flex-1 p-6 bg-gray-900">
          <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap break-words">
            {data.yaml}
          </pre>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
