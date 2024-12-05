/* eslint-disable react/prop-types */
import styles from './Button.module.css'

function Button({ text, clickF, blue, disabled }) {

    return (
        <button className={blue ? `${styles.button} ${styles.buttonBlue}` : styles.button} onClick={clickF} disabled={disabled}>
            {text}
        </button>
    );
}

export default Button;