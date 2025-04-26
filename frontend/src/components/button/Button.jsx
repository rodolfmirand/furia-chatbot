import styles from './Button.module.css'
import sendButton from '../../assets/send-button.png'
function Button() {
    return (
        <>
            <button className={styles.chatButton}>
                <img className={styles.buttonIcon} src={sendButton} alt="" />
            </button>
        </>
    );
}
export default Button