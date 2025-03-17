import cn from "classnames/bind";
import styles from "./Section.module.scss";

const cx = cn.bind(styles);

type SectionProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section(props: SectionProps) {
  const { title, children, className } = props;
  return (
    <section className={cx("Section", { className })}>
      <h1 className={cx("SectionTitle")}>{title}</h1>
      {children}
    </section>
  );
}
