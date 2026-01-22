import React from 'react';
import { Text, TextProps, useColorScheme } from 'react-native';

type ThemedTextProps = TextProps;

const ThemedText: React.FC<ThemedTextProps> = (props) => {
  const scheme = useColorScheme();
  const color = scheme === 'dark' ? '#fff' : '#000';

  return <Text {...props} style={[{ color }, props.style]} />;
};

export default ThemedText;
