/** @jsx jsx */
import { jsx } from '@emotion/core';
import { PureComponent, Fragment, ErrorInfo } from 'react';

export default class ErrorBoundary extends PureComponent {
  state: { error: Error; errorInfo: ErrorInfo } = {
    error: null,
    errorInfo: null,
  };
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error);
    console.error(errorInfo);
    this.setState({ error, errorInfo });
  }
  render() {
    if (this.state.error) {
      return <Fragment>error</Fragment>;
    }
    return this.props.children;
  }
}
