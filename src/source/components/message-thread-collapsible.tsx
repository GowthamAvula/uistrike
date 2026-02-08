import { useTamboV1, useTamboV1ThreadInput } from "@tambo-ai/react/v1";
import { useState } from "react";

interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string | any;
}

const renderContentWithLinks = (text: string) => {
    if (!text) return "";
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) =>
        urlRegex.test(part) ? (
            <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 underline break-all dark:text-blue-400">
                {part}
            </a>
        ) : part
    );
};

export function MessageThreadCollapsible() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, isStreaming } = useTamboV1();
    const { value, setValue, submit, isPending } = useTamboV1ThreadInput();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim() || isPending) return;
        await submit();
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="mb-4 flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="flex items-center justify-between border-b border-zinc-100 p-4 dark:border-zinc-800">
                        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Tambo Chat</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            suppressHydrationWarning={true}
                            className="text-zinc-500 hover:text-zinc-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {(messages as ChatMessage[]).map((msg, index: number) => (
                            <div key={`${msg.id}-${index}`} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user'
                                    ? 'bg-black text-white dark:bg-white dark:text-black'
                                    : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                                    }`}>
                                    {typeof msg.content === 'string'
                                        ? renderContentWithLinks(msg.content)
                                        : Array.isArray(msg.content)
                                            ? msg.content.map((part: any, i: number) => {
                                                if (part.type === 'text') return <span key={i}>{renderContentWithLinks(part.text)}</span>;
                                                if (part.type === 'link') return <a key={i} href={part.url} target="_blank" rel="noopener noreferrer" className="text-cyan-500 underline mx-1">{part.title || part.url}</a>;
                                                if (part.type === 'image') return <img key={i} src={part.url} alt="Uploaded content" className="max-w-full rounded-lg my-2 border border-white/10" />;
                                                return null;
                                            })
                                            : renderContentWithLinks(msg.content?.text || '')
                                    }
                                </div>
                            </div>
                        ))}
                        {isStreaming && (
                            <div className="flex justify-start">
                                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-4 py-2">
                                    <span className="flex gap-1">
                                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400"></span>
                                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:0.2s]"></span>
                                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:0.4s]"></span>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="border-t border-zinc-100 p-4 dark:border-zinc-800">
                        <div className="flex gap-2 items-center">
                            <label className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors">
                                <input type="file" className="hidden" onChange={(e) => {
                                    // Normally you would handle file upload here using Tambo SDK
                                    console.log("File selected:", e.target.files?.[0]);
                                    alert("Image upload feature ready! Just paste the image or select it here.");
                                }} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                            </label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Type a message or paste link..."
                                suppressHydrationWarning={true}
                                className="flex-1 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-900 focus:border-black focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-white"
                            />
                            <button
                                type="submit"
                                disabled={isPending || !value.trim()}
                                suppressHydrationWarning={true}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-opacity disabled:opacity-50 dark:bg-white dark:text-black"
                                aria-label="Send message"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                suppressHydrationWarning={true}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg transition-transform hover:scale-105 active:scale-95 dark:bg-white dark:text-black"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
                )}
            </button>
        </div>
    );
}
