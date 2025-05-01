import Button from '../button/Button';
import styles from './Input.module.css'
function Input({ value, onChange, onSend }) {
    function autoresize(e) {
        e.target.style.height = '20px';
        e.target.style.height = `${e.target.scrollHeight}px`
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    }

    return (
        <>
            <textarea
                className={styles.chatTextarea}
                rows={1}
                placeholder='Digite sua mensagem...'
                onInput={autoresize}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
            />
            <Button onClick={onSend} />
        </>
    );
}
export default Input;