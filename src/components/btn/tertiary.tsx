import Squares from "@components/decorations/Squares";
import classNames from "classnames";

export default function BtnTertiary({
  children,
  href = null,
  className = "",
  ...props
}): JSX.Element {
  const classes = classNames("btn-tertiary flex relative", className);
  const ButtonContent = <>{children}</>;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {ButtonContent}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {ButtonContent}
    </button>
  );
}
