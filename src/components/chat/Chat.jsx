import React, { useState, useEffect, useRef } from 'react';

const LOCAL_STORAGE_KEY = 'chat-history';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  // Load conversation history from localStorage on component mount
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setMessages(savedMessages);
  }, []);

  // Save conversation history to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (message.trim()) {
      setLoading(true);
      const conversationId = Date.now(); // Unique ID for the conversation

      // Save user's message
      const userMessage = { id: conversationId, type: 'user', text: message };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Send message to server
      try {
        const response = await fetch('http://localhost:8000/v1/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: message, role: 'user' }),
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();

        // Save assistant's response
        const assistantMessage = { id: conversationId, type: 'assistant', text: result.content };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
        setMessage('');
      }
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='relative flex-1 p-10 text-white bg-gradient-to-b from-customPurple via-customGrey to-customBlack dark:bg-[#164] flex flex-col items-center'>
      <div className='flex-1 overflow-auto w-full max-w-2xl'>
        {/* Display messages */}
        <div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start my-2 p-2 rounded ${
                msg.type === 'user'
                  ? 'bg-transparent text-white border-none' // User chat styles
                  : 'flex items-center bg-transparent text-gray-800 dark:bg-[#040421] dark:text-gray-100' // Assistant chat styles
              }`}
            >
              {msg.type === 'user' ? (
                <>
                  <div className='flex-1'>{msg.text}</div>
                </>
              ) : (
                <>
                  {loading && (
                    <div className='w-6 h-6 mr-2'>
                      {/* Loading spinner or robot SVG */}
                    </div>
                  )}
                  <div className={`flex-1 p-2 border-b border-gray-200 ${loading ? 'bg-gray-50 dark:bg-[#040421]' : ''}`}>{msg.text}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="relative mx-2 flex w-full max-w-2xl flex-grow-0 flex-col rounded-md border border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:border-gray-900/50 dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] sm:mx-4">
        <textarea
          ref={textareaRef}
          className="m-0 w-full resize-none border bg-gradient-to-b from-customTopIn via-customMiddleIn to-customBottomIn p-0 py-2 pr-8 pl-10 text-white dark:bg-[white] dark:text-[white] md:py-3 md:pl-10 rounded-md border-customBorderIn"
          style={{
            height: '100px', // Adjusted height
            maxHeight: '150px', // Adjusted max-height
            overflowY: 'auto',
          }}
          placeholder='Ask me anything...'
          value={message}
          rows={2}
          onCompositionStart={() => setIsTyping(true)}
          onCompositionEnd={() => setIsTyping(false)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className='absolute bottom-2 right-2 p-2 bg-blue-500 text-white rounded'
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
