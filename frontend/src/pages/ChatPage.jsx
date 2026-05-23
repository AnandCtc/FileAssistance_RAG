import { useState, useEffect } from 'react';

import MainLayout from '../layouts/MainLayout';
import { askQuestion, getHistory } from '../api/queryApi';

import {
  FiSend
} from 'react-icons/fi';

function ChatPage() {

  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await getHistory();
        const pairs = res.data || [];

        // API returns newest first; reverse to show oldest->newest
        const ordered = pairs.slice().reverse();

        const msgs = [];
        ordered.forEach((p) => {
          const time = p.createdAt ? new Date(p.createdAt).toLocaleString() : '';
          msgs.push({ sender: 'user', text: p.question, time });
          msgs.push({ sender: 'ai', text: p.answer, time });
        });

        setMessages(msgs);
      } catch (err) {
        console.error('Failed to load history', err);
      }
    };

    loadHistory();
  }, []);

  const handleSend = async () => {
    if (!question.trim()) {
      return;
    }

    const userMessage = {
      sender: 'user',
      text: question,
      time: 'Now'
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const response = await askQuestion(question);
      const aiMessage = {
        sender: 'ai',
        text: response.data?.answer || 'No answer returned from API.',
        time: 'Now'
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat API Error:', error);
      const errorMessage = {
        sender: 'ai',
        text: 'Failed to get response from AI.',
        time: 'Now'
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <div className="chat-page">

        {/* HEADER */}

        <div className="chat-header">

          <h1>RAG Chat Assistant</h1>

          <p>
            Ask questions about your uploaded documents
          </p>

        </div>

        {/* CHAT CARD */}

        <div className="chat-card">

          {/* MESSAGES */}

          <div className="chat-messages">

            {messages.map((message, index) => (

              <div
                key={index}
                className={`message-row ${message.sender}`}
              >

                {/* AI AVATAR */}

                {message.sender === 'ai' && (

                  <div className="ai-avatar">
                    🤖
                  </div>

                )}

                {/* MESSAGE */}

                <div
                  className={`message-bubble ${message.sender}`}
                >

                  <p>
                    {message.text}
                  </p>

                  <span className="message-time">
                    {message.time}
                  </span>

                </div>

              </div>

            ))}

            {loading && (
              <div className="message-row ai">
                <div className="message-bubble ai">
                  <p className="thinking">Thinking<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></p>
                </div>
              </div>
            )}

          </div>

          {/* INPUT */}

          <div className="chat-input-container">

            <input
              type="text"
              placeholder="Ask a question..."
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
            />

            <button
              className="send-btn"
              onClick={handleSend}
            >
              <FiSend />
              Send
            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default ChatPage;