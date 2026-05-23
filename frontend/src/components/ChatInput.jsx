import { useState } from 'react';

function ChatInput({ onSend }) {

  const [question, setQuestion] = useState('');

  const handleSubmit = () => {

    if (!question.trim()) {
      return;
    }

    onSend(question);

    setQuestion('');
  };

  return (
    <div className="chat-input-container">

      <input
        type="text"
        placeholder="Ask something about your documents..."
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }

        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />

      <button
        className="send-btn"
        onClick={handleSubmit}
      >
        Send
      </button>

    </div>
  );
}

export default ChatInput;