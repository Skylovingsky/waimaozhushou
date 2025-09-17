"use client";

interface ReportCardProps {
  name: string;
  country: string;
  aiInfo?: string;
  onSearch?: () => void;
  loading?: boolean;
}

export default function ReportCard({ name, country, aiInfo, onSearch, loading }: ReportCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white space-y-2">
      <p className="font-semibold">{name}</p>
      <p className="text-gray-600">{country}</p>

      {onSearch && (
        <button
          onClick={onSearch}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "加载中..." : "AI 搜索"}
        </button>
      )}

      {aiInfo && (
        <div className="mt-2 p-2 bg-gray-50 border rounded text-sm">
          {aiInfo}
        </div>
      )}
    </div>
  );
}
