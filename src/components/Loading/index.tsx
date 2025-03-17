import cn from "classnames/bind";
import styles from "./Loading.module.scss";

const cx = cn.bind(styles);

const Loading = () => {
  return (
    <div className={cx("loading")}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loading;
