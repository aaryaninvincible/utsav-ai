import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Copy,
  Check,
  Plus,
  RefreshCw,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { EventData, ChatMessage, TaskSuggestion } from '../types';
import { demoAssistantReply, toISODate } from '../services/aiService';
import { requestAssistant, toEventContext, getAIStatus } from '../services/aiClient';
import { AIStatus } from '../shared/aiContract';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventData;
  onUpdateEvent: (updated: EventData) => void;
  initialPrompt?: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  event,
  onUpdateEvent,
  initialPrompt,
}) => {
  const [inputMessage, setInputMessage] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [addedTaskId, setAddedTaskId] = useState<string | null>(null);
  const [aiStatus, setAiStatus] = useState<AIStatus>({ configured: false });
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Reduce my decoration budget',
    'Create a vegetarian menu plan',
    'What should I complete this week?',
    'Prepare an event-day schedule',
    'Give me affordable alternatives',
    'Suggest a traditional theme within my budget',
  ];

  useEffect(() => {
    getAIStatus().then(setAiStatus);
  }, []);

  useEffect(() => {
    if (initialPrompt) {
      setInputMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [event.chatHistory, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    setErrorNotice(null);
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: nowTime,
    };

    const currentHistory = event.chatHistory || [];
    const nextHistory = [...currentHistory, userMsg];
    onUpdateEvent({ ...event, chatHistory: nextHistory });
    setInputMessage('');
    setIsLoading(true);

    try {
      // 1. Try server-side AI gateway first
      const context = toEventContext(event);
      const historyPayload = currentHistory.slice(-6).map((m) => ({
        role: m.sender,
        text: m.text,
      }));

      const res = await requestAssistant(
        context,
        text,
        historyPayload,
        toISODate(new Date())
      );

      const assistantMsg: ChatMessage = {
        id: `chat-${Date.now() + 1}`,
        sender: 'assistant',
        text: res.reply.answer,
        source: res.meta.source,
        followUps: res.reply.followUps,
        taskSuggestions: res.reply.taskSuggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      onUpdateEvent({ ...event, chatHistory: [...nextHistory, assistantMsg] });
    } catch (err: any) {
      // 2. Seamlessly fall back to rule-based offline demo generator
      const demoReply = demoAssistantReply(text, event);
      const assistantMsg: ChatMessage = {
        id: `chat-${Date.now() + 1}`,
        sender: 'assistant',
        text: demoReply.answer,
        source: 'demo',
        followUps: demoReply.followUps,
        taskSuggestions: demoReply.taskSuggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      onUpdateEvent({ ...event, chatHistory: [...nextHistory, assistantMsg] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddTaskSuggestion = (task: TaskSuggestion, suggestionKey: string) => {
    const eventDate = new Date(`${event.date}T12:00:00`);
    const dueDate = toISODate(
      new Date(eventDate.getTime() - task.daysBefore * 24 * 60 * 60 * 1000)
    );

    const newTask = {
      id: 'task_' + Date.now(),
      title: task.title,
      description: task.description,
      dueDate,
      daysBefore: task.daysBefore,
      priority: task.priority,
      status: 'pending' as const,
      category: 'AI Recommendation',
      phase: '30-14 Days' as const,
    };

    onUpdateEvent({
      ...event,
      timeline: [newTask, ...(event.timeline || [])],
    });

    setAddedTaskId(suggestionKey);
    setTimeout(() => setAddedTaskId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="card w-full max-w-2xl h-[620px] max-h-[90vh] flex flex-col overflow-hidden bg-surface shadow-lift border border-gold/40">
        
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-line flex items-center justify-between bg-surface-2/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-maroon text-on-primary flex items-center justify-center border border-gold/40 shrink-0">
              <Bot className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-ink">
                  Celebration Concierge
                </h3>
                <span className="chip text-[10px] font-semibold text-gold-ink">
                  {aiStatus.configured
                    ? aiStatus.provider === 'gemini'
                      ? 'Gemini 3.6 Flash'
                      : 'Local Gemma 12B'
                    : 'Smart Demo Engine'}
                </span>
              </div>
              <p className="text-[11px] text-ink-2 truncate max-w-sm">
                Context: {event.name} ({event.city}, {event.guestCount} guests)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="icon-btn h-8 w-8 text-ink-2 hover:text-ink"
            aria-label="Close concierge"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* Welcome / Empty State */}
          {(!event.chatHistory || event.chatHistory.length === 0) && (
            <div className="p-6 text-center space-y-3 bg-surface-2/40 rounded-2xl border border-line my-4">
              <div className="w-10 h-10 rounded-full bg-maroon/10 text-gold-ink flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-ink">
                  Namaste! How may I assist your celebration?
                </h4>
                <p className="text-xs text-ink-2 mt-1 max-w-md mx-auto leading-relaxed">
                  I understand your budget ({event.totalBudget}), dates, and dietary preferences. Select a common inquiry below or ask anything.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-left">
                {quickPrompts.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="p-2.5 rounded-xl border border-line bg-surface hover:border-gold hover:bg-surface-2 text-xs text-ink transition-colors font-medium flex items-center justify-between"
                  >
                    <span>{q}</span>
                    <Plus className="w-3 h-3 text-gold-ink shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Messages */}
          {event.chatHistory?.map((msg, index) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id || index}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-maroon text-on-primary flex items-center justify-center shrink-0 border border-gold/40 mt-1">
                    <Bot className="w-4 h-4 text-gold" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                    isUser
                      ? 'bg-maroon text-on-primary rounded-tr-none'
                      : 'bg-surface-2 border border-line text-ink rounded-tl-none'
                  }`}
                >
                  {/* Source indicator */}
                  {!isUser && msg.source && (
                    <div className="flex items-center justify-between text-[10px] text-ink-2 border-b border-line/60 pb-1 mb-1 font-semibold uppercase tracking-wider">
                      <span className="text-gold-ink">
                        {msg.source === 'demo' ? '⚡ Smart Offline Demo' : `✨ ${msg.source.toUpperCase()}`}
                      </span>
                      <span>{msg.timestamp}</span>
                    </div>
                  )}

                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Task Suggestions */}
                  {!isUser && msg.taskSuggestions && msg.taskSuggestions.length > 0 && (
                    <div className="pt-2 border-t border-line/60 space-y-2">
                      <span className="text-[10px] uppercase font-bold text-gold-ink block">
                        Recommended Action Items:
                      </span>
                      {msg.taskSuggestions.map((ts, idx) => {
                        const sugKey = `${msg.id}-ts-${idx}`;
                        const isAdded = addedTaskId === sugKey;
                        return (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-surface border border-line flex items-center justify-between gap-3 text-xs"
                          >
                            <div>
                              <span className="font-semibold text-ink block">{ts.title}</span>
                              <span className="text-[10px] text-ink-2">{ts.description}</span>
                            </div>
                            <button
                              onClick={() => handleAddTaskSuggestion(ts, sugKey)}
                              disabled={isAdded}
                              className={`btn-sm text-[10px] px-2.5 py-1 rounded-md shrink-0 font-semibold ${
                                isAdded ? 'bg-forest text-white' : 'btn-primary'
                              }`}
                            >
                              {isAdded ? 'Added ✓' : '+ Add Task'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Action follow-ups */}
                  {!isUser && msg.followUps && msg.followUps.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5 border-t border-line/60">
                      {msg.followUps.map((fu, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(fu)}
                          className="text-[11px] px-2.5 py-1 rounded-full border border-gold/40 bg-surface hover:bg-gold/10 text-gold-ink font-semibold transition-colors"
                        >
                          {fu}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Copy button */}
                  {!isUser && (
                    <div className="pt-1 text-right">
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="text-[10px] text-ink-2 hover:text-ink inline-flex items-center gap-1 font-semibold"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-forest" />
                            <span className="text-forest">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-surface-2 border border-line flex items-center justify-center shrink-0 text-ink-2 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2.5 items-start">
              <div className="w-7 h-7 rounded-lg bg-maroon text-on-primary flex items-center justify-center shrink-0 border border-gold/40">
                <Bot className="w-4 h-4 text-gold animate-pulse" />
              </div>
              <div className="bg-surface-2 border border-line rounded-2xl p-3.5 rounded-tl-none text-xs text-ink-2 flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-gold animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-maroon animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-forest animate-bounce [animation-delay:0.4s]" />
                <span>Analyzing celebration parameters...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-line bg-surface-2/40">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about budget reduction, veg menu items, schedule..."
              className="input flex-1"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="btn-primary h-11 px-4"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
