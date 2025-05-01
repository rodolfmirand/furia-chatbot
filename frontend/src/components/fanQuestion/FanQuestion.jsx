import styles from '../../components/fanQuestion/fanquestion.module.css'
import fanIcon from '../../assets/fan-icon.png'
function FanQuestion({ question }) {
    return (
        <div className={styles.messageContainer}>
            <div className={styles.message}>
                <p>{question}</p>
            </div>
            <img className={styles.fanIcon} src={fanIcon} alt="" />
        </div>
    )
}
export default FanQuestion