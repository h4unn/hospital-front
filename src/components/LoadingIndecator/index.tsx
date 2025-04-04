import cn from "classnames/bind";
import styles from "./LoadingIndecator.module.scss";

const cx = cn.bind(styles);

const LoadingIndecator = () => {
  return (
    <div className={cx("loading")}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default LoadingIndecator;
