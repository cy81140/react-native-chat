import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import { lightColors, darkColors, elevation, borderRadius } from '../config/constants';
import { typography } from '../config/typography';

const Button = ({ title, variant = 'contained', size = 'medium', onPress, style, disabled }) => {
  const getBackgroundColor = () => {
    if (disabled) return lightColors.secondaryDark;
    if (variant === 'contained') return lightColors.primary;
    return 'transparent';
  };

  const getTextColor = () => {
    if (disabled) return lightColors.textSecondary;
    if (variant === 'contained') return lightColors.text;
    return lightColors.primary;
  };

  const buttonSizes = {
    small: { paddingVertical: 8, paddingHorizontal: 16 },
    medium: { paddingVertical: 12, paddingHorizontal: 24 },
    large: { paddingVertical: 16, paddingHorizontal: 32 },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        buttonSizes[size],
        { backgroundColor: getBackgroundColor() },
        variant === 'outlined' && styles.outlined,
        style,
      ]}
    >
      <Text style={[typography.button, { color: getTextColor() }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    ...(Platform.OS === 'web' ? {
      boxShadow: elevation.md.web
    } : Platform.select({
      ios: {
        shadowColor: elevation.md.ios.shadowColor,
        shadowOffset: elevation.md.ios.shadowOffset,
        shadowOpacity: elevation.md.ios.shadowOpacity,
        shadowRadius: elevation.md.ios.shadowRadius,
      },
      android: {
        elevation: elevation.md.android,
      },
    })),
  },
  outlined: {
    borderWidth: 1,
    borderColor: lightColors.primary,
    ...elevation.none,
  },
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onPress: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Button;
