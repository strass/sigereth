/** @jsx jsx */
import { jsx } from '@emotion/core';
import { PureComponent, ErrorInfo } from 'react';

export class Loading extends Error {
  public constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, Loading.prototype);
  }
}

export default class ErrorBoundary extends PureComponent {
  public state: { error: Error | null; errorInfo: ErrorInfo | null } = {
    error: null,
    errorInfo: null,
  };

  public componentDidMount() {
    console.log('ErrorBoundary mounted');
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error(error);
    console.error(errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;
    console.assert(!error, 'render errorboundary');
    if (error && error instanceof Loading) {
      console.log('caught loading component');
      return <span>loading...!???!</span>;
    }

    if (error) {
      return (
        <div>
          <h3>error</h3>
          <pre>{JSON.stringify(errorInfo)}</pre>
        </div>
      );
    }
    return children;
  }
}
