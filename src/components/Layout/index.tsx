import classNames from "classnames";
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

function Layout({ children, className }: LayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full">
      <Header />

      <main className={classNames('container flex flex-col w-full flex-1', className)}>
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
