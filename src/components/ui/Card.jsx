import { classNames } from "../../utils/format";

export default function Card({ children, className }) {
  return <div className={classNames("glass hover-rise rounded-2xl p-4 md:p-5", className)}>{children}</div>;
}

