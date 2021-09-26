import Squares from "@components/decorations/Squares";
import classNames from "classnames";

export default function BtnSecondary({
  children = null,
  href = null,
  className = "",
  ...props
}): JSX.Element {
  const classes = classNames("btn-secondary flex relative", className);
  const ButtonContent = (
    <>
      {children}

      <Squares />
    </>
  );

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
