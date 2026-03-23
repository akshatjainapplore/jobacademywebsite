'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, inputValue, setInputValue, isLoading, handleSend } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, fontFamily: 'sans-serif' }}>
            {/* Chat Window */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    bottom: '80px',
                    right: '0',
                    width: '350px',
                    height: '500px',
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0'
                }}>
                    {/* Header */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        padding: '1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #f1f5f9'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '10px', height: '10px', backgroundColor: '#10b981', borderRadius: '50%', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)' }}></div>
                            <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.01em' }}>Job Academy AI</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                background: '#f8fafc',
                                border: 'none',
                                color: '#64748b',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#f1f5f9';
                                e.currentTarget.style.color = '#0f172a';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#f8fafc';
                                e.currentTarget.style.color = '#64748b';
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', backgroundColor: '#f8fafc' }}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                marginBottom: '1rem'
                            }}>
                                <div style={{
                                    maxWidth: '85%',
                                    padding: '1rem 1.25rem',
                                    borderRadius: '20px',
                                    borderBottomRightRadius: msg.role === 'user' ? '4px' : '20px',
                                    borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '20px',
                                    backgroundColor: msg.role === 'user' ? '#1F4E8C' : '#f1f5f9',
                                    color: msg.role === 'user' ? 'white' : '#1e293b',
                                    boxShadow: msg.role === 'assistant' ? '0 2px 4px rgba(0,0,0,0.02)' : '0 4px 12px rgba(31, 78, 140, 0.2)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6',
                                    letterSpacing: '0.01em'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{
                                        backgroundColor: '#f1f5f9',
                                        padding: '1rem 1.25rem',
                                        borderRadius: '20px',
                                        borderBottomLeftRadius: '4px',
                                        color: '#64748b',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        gap: '6px',
                                        alignItems: 'center'
                                    }}>
                                        <span style={{ width: '6px', height: '6px', backgroundColor: '#94a3b8', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.32s' }}></span>
                                        <span style={{ width: '6px', height: '6px', backgroundColor: '#94a3b8', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.16s' }}></span>
                                        <span style={{ width: '6px', height: '6px', backgroundColor: '#94a3b8', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }}></span>
                                    </div>
                                </div>
                                <style dangerouslySetInnerHTML={{
                                    __html: `
                                    @keyframes bounce {
                                        0%, 80%, 100% { transform: scale(0); }
                                        40% { transform: scale(1); }
                                    }
                                `}} />
                            </>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions - Show only when there is just the welcome message */}
                    {messages.length === 1 && !isLoading && (
                        <div style={{ padding: '0 1rem 1rem 1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', backgroundColor: '#f8fafc' }}>
                            {[
                                "I'm a job seeker",
                                "I'm an employer",
                                "I need other help",
                                "facing difficulties while applying for a job"
                            ].map((action, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setInputValue(action);
                                        // We need to trigger send immediately
                                        handleSend(action);
                                    }}
                                    style={{
                                        backgroundColor: 'white',
                                        border: '1px solid #cbd5e1',
                                        borderRadius: '20px',
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.85rem',
                                        color: '#334155',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                        transition: 'all 0.2s',
                                        maxWidth: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.borderColor = '#1F4E8C';
                                        e.currentTarget.style.color = '#1F4E8C';
                                        e.currentTarget.style.backgroundColor = '#f0f9ff';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.borderColor = '#cbd5e1';
                                        e.currentTarget.style.color = '#334155';
                                        e.currentTarget.style.backgroundColor = 'white';
                                    }}
                                >
                                    {action}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Area */}
                    <div style={{ padding: '1.25rem 1rem', borderTop: '1px solid #f1f5f9', backgroundColor: 'white' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', position: 'relative' }}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Message AI..."
                                disabled={isLoading}
                                style={{
                                    flex: 1,
                                    padding: '1rem 3.5rem 1rem 1.5rem',
                                    borderRadius: '100px',
                                    border: '1px solid #e2e8f0',
                                    outline: 'none',
                                    fontSize: '0.95rem',
                                    backgroundColor: '#f8fafc',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#1F4E8C';
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(31, 78, 140, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.backgroundColor = '#f8fafc';
                                    e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)';
                                }}
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={isLoading || !inputValue.trim()}
                                style={{
                                    backgroundColor: inputValue.trim() ? '#1F4E8C' : '#e2e8f0',
                                    color: inputValue.trim() ? 'white' : '#94a3b8',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '38px',
                                    height: '38px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: inputValue.trim() ? 'pointer' : 'default',
                                    position: 'absolute',
                                    right: '6px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    transition: 'all 0.2s ease',
                                    boxShadow: inputValue.trim() ? '0 4px 10px rgba(31, 78, 140, 0.3)' : 'none'
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="19" x2="12" y2="5"></line>
                                    <polyline points="5 12 12 5 19 12"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: '#1F4E8C',
                        boxShadow: '0 4px 12px rgba(31, 78, 140, 0.4)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <div style={{ fontSize: '1.75rem' }}>💬</div>
                </button>
            )}
        </div>
    );
}
