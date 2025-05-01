import styles from './furiabot.module.css';
import furiaIcon from '../../assets/furia-esports-logo.png'
function FuriaBot() {
    return (
        <div className={styles.messageContainer}>
            <img className={styles.furiaIcon} src={furiaIcon} alt="" />
            <div className={styles.message}>
                <div>
                    <p></p>
                </div>
            </div>
        </div>
    );
}
export default FuriaBot