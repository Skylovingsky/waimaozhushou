"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchOutreachMessages, OutreachMessage } from "../../lib/api";
import OutreachCard from "../../components/OutreachCard";

export default function OutreachPage() {
  const router = useRouter();
  const { id } = router.query;

  const [messages, setMessages] = useState<OutreachMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetchOutreachMessages(id as string)
      .then((data) => setMessages(data))
      .catch((err) => console.error("获取外联话术失败", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">加载中...</p>;

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">外联话术</h1>

      {messages.length === 0 ? (
        <p className="text-gray-600">暂无话术</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m, idx) => (
            <OutreachCard
              key={idx}
              channel={m.channel}
              language={m.language}
              content={m.content}
            />
          ))}
        </div>
      )}
    </main>
  );
}
