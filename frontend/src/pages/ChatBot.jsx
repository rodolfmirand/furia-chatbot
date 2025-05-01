import FuriaBot from '../components/furiabot/FuriaBot';
import Input from '../components/input/Input';
import FanQuestion from '../components/fanQuestion/FanQuestion';
import styles from './ChatBot.module.css'
import { useState } from 'react';
import { getChatResponse } from '../utils/GetChatResponse';
function ChatBot() {
    const [messages, setMessages] = useState([
        'Bot: Olá, torcedor! Sou um chatbot da Furia. O que gostaria se saber sobre o time?'
    ]);

    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim() === '') return;

        setMessages((prev) => [...prev, `Você:${input}`]);

        try {
            const response = await getChatResponse(input);

            setMessages((prev) => [...prev, `Bot:${response}`])

            setInput('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.chatContainer}>
            <div className={styles.messagesArea}>
                {messages.map((msg, index) => (
                    <div key={index}>
                        {msg.startsWith('Bot:') ? (
                            <FuriaBot text={msg.replace('Bot:', '').trim()} />
                        ) : (
                            <FanQuestion question={msg.replace('Você:', '').trim()} />
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.inputArea}>
                <Input question={input} onChange={(e) => setInput(e.target.value)} onSend={handleSend} />
            </div>
        </div>
    );
}
export default ChatBot