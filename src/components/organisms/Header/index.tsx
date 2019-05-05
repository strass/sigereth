/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, Fragment } from 'react';
import { Link } from 'react-navi';

const HeaderOrganism: FunctionComponent = () => {
  return (
    <Fragment>
      <Link href="/">Home</Link>
      <Link href="/profile">Profile</Link>
    </Fragment>
  );
};

export default HeaderOrganism;
