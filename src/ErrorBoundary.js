import React from 'react';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div role="alert"><p>We could not load this page.</p><button type="button" onClick={() => window.location.reload()}>Reload page</button></div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
