import { useState } from 'react';

import ChatInput from './ChatInput';

import { askQuestion } from '../api/queryApi';

function ChatWindow() {

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSend = async (question) => {

    // USER MESSAGE

    const userMessage = {
      sender: 'user',
      text: question
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    setLoading(true);

    try {

      console.log(
        'Calling chat API...'
      );

      // CALL SPRING BOOT API

      const response =
        await askQuestion(question);

      console.log(
        'Chat API Response:',
        response.data
      );

      // AI MESSAGE

      const aiMessage = {
        sender: 'ai',
        text: response.data.answer
      };

      setMessages((prev) => [
        ...prev,
        aiMessage
      ]);

    } catch (error) {

      console.error(
        'Chat API Error:',
        error
      );

      const errorMessage = {
        sender: 'ai',
        text: 'Failed to get response from AI'
      };

      setMessages((prev) => [
        ...prev,
        errorMessage
      ]);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="chat-card">

      {/* CHAT MESSAGES */}

      <div className="chat-messages">

        {messages.map((message, index) => (

          <div
            key={index}
            className={`message-row ${message.sender}`}
          >

            <div
              className={`message-bubble ${message.sender}`}
            >

              <p>{message.text}</p>

            </div>

          </div>

        ))}

        {loading && (

          <div className="message-row ai">

            <div className="message-bubble ai">

              <p>Thinking...</p>

            </div>

          </div>

        )}

      </div>

      {/* INPUT */}

      <ChatInput
        onSend={handleSend}
      />

    </div>
  );
}

export default ChatWindow;