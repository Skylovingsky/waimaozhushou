"use client";

export default function LogsPage() {
  const logs = [
    { t: "2025/09/17", text: "联系了 XXX Corporation (USA) → 已记录" },
    { t: "2025/09/17", text: "忽略了 YYY Ltd (UK)" },
  ];

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">我的操作记录 (CDO Log)</h1>

      <div className="space-y-2">
        {logs.map((l, i) => (
          <div key={i} className="p-3 border rounded bg-white text-sm">
            <span className="text-gray-500 mr-3">{l.t}</span>
            <span>{l.text}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
