import styled, { StyledComponent } from '@emotion/styled';
import { FontFamily } from './fonts';
import { modularScale } from 'polished';
import { noMarginPadding } from '../../../styling/normalize';
import { allSmallCaps } from '../../../styling/type';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

const Header = styled.span([
  {
    // fontFamily: FontFamily.ENVISION_ROMAN,
    fontFamily: FontFamily.MERCURY_TEXT_G2,
    // fontFamily: FontFamily.FUTURA_PT,

    fontWeight: 'bold',
  },
  noMarginPadding,
]);

const H1 = styled(Header)([
  { fontSize: modularScale(5, '1rem', 'majorSecond') },
]);
const H2 = styled(Header)([
  { fontSize: modularScale(4, '1rem', 'majorSecond') },
]);
const H3 = styled(Header)([
  { fontSize: modularScale(3, '1rem', 'majorSecond') },
]);
const H4 = styled(Header)([
  { fontSize: modularScale(2, '1rem', 'majorSecond') },
]);
const H5 = styled(Header)([
  { fontSize: modularScale(1, '1rem', 'majorSecond') },
]);
const H6: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadElement>, HTMLHeadElement>,
  undefined,
  any
> = styled(Header.withComponent('h6'))([
  {
    fontSize: modularScale(0, '1rem', 'majorSecond'),
    lineHeight: modularScale(0, '1rem', 'majorSecond'),
  },
  allSmallCaps,
]);

export default {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
};
