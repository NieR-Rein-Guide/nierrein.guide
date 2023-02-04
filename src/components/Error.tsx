import React from "react";

export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null,
  };

  constructor(props) {
    super(props);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      console.log(this.state.error);

      return (
        <div className="flex flex-col items-center justify-center mt-12 text-center">
          <p>Something went wrong.</p>
          <h3>Please try refreshing the page.</h3>
        </div>
      );
    }

    return this.props.children;
  }
}
