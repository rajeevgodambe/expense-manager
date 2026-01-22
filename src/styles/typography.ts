import { StyleSheet, TextStyle } from 'react-native';

type TypographyStyles = {
  body: TextStyle;
  bodyBold: TextStyle;
  title: TextStyle;
  heading: TextStyle;
};

export const typography = StyleSheet.create<TypographyStyles>({
  body: {
    fontSize: 14,
    fontWeight: '400',
  },
  bodyBold: {
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
  },
});
