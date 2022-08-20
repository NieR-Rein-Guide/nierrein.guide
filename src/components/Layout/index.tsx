import classNames from "classnames";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  hasContainer?: boolean;
}

function Layout({
  children,
  className,
  hasContainer = true,
}: LayoutProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full">
      <Header />

      <main
        className={classNames(
          "flex flex-col w-full flex-1",
          hasContainer ? "container" : "",
          className
        )}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
