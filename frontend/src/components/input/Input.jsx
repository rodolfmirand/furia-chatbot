import Button from '../button/Button';
import styles from './Input.module.css'
function Input() {
    function autoresize(e){
        e.target.style.height = '20px';
        e.target.style.height = `${e.target.scrollHeight}px`
    }

    return (
        <>
            <textarea className={styles.chatTextarea} rows={1} placeholder='Digite sua mensagem...' onInput={autoresize}/>
            <Button />
        </>
    );
}
export default Input;