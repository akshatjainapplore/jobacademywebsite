import { useState } from 'react';

export type Message = {
    role: 'user' | 'assistant';
    text: string;
};

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', text: 'Hello! How can I help you with your career today?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (customMessage?: string) => {
        const msgToSend = customMessage || inputValue;
        if (!msgToSend.trim()) return;

        if (!customMessage) setInputValue('');
        setMessages(prev => [...prev, { role: 'user', text: msgToSend }]);
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msgToSend }),
            });

            const data = await res.json();

            if (data.text) {
                setMessages(prev => [...prev, { role: 'assistant', text: data.text }]);
            } else if (data.error) {
                setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, something went wrong." }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', text: "I'm having trouble connecting. Please check your internet." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages,
        inputValue,
        setInputValue,
        isLoading,
        handleSend
    };
}
