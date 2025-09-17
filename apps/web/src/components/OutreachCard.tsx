"use client";

interface OutreachCardProps {
  channel: string;
  language: string;
  content: string;
}

export default function OutreachCard({ channel, language, content }: OutreachCardProps) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm space-y-1">
      <p className="text-sm text-gray-500">
        渠道: {channel} | 语言: {language}
      </p>
      <p>{content}</p>
    </div>
  );
}
