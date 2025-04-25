import Input from '../components/input/Input';
import styles from './ChatBot.module.css'
function ChatBot() {
    return (
        <div className={styles.chatContainer}>
            <div className={styles.messages}></div>
            <div className={styles.inputArea}>
                <Input/>
            </div>
        </div>
    );
}
export default ChatBot