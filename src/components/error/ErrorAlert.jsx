import styles from "./ErrorAlert.module.css";
import oppsImage from "./oops.png";


const ErrorAlert = ({ textError }) => {
  return (
    <div role="alert" className={styles.wrapper}>
      <img src={oppsImage} width="550" alt="opps" />
      <p text={textError} className={styles.text}>
        {textError}
      </p>
    </div>
  );
}


export default ErrorAlert;