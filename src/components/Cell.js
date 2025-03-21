import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Cell = ({
  title,
  icon,
  tintColor,
  style,
  onPress,
  secondIcon: SecondIcon,
  subtitle,
  showForwardIcon = true,
}) => (
  <TouchableOpacity style={[styles.cell, style]} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: tintColor }]}>
      <Ionicons name={icon} size={24} color="white" />
    </View>

    <View style={styles.textsContainer}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>

    {showForwardIcon && (
      <View style={styles.forwardIcon}>
        {SecondIcon ? (
          <SecondIcon width={20} height={20} />
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#C0C0C0" />
        )}
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  iconContainer: {
    alignContent: 'center',
    borderRadius: 6,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  subtitle: {
    color: '#565656',
  },
  textsContainer: {
    flex: 1,
    marginStart: 8,
  },
  title: {
    fontSize: 16,
  },
  forwardIcon: {
    marginLeft: 8,
  }
});

Cell.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  tintColor: PropTypes.string,
  style: PropTypes.object,
  onPress: PropTypes.func,
  secondIcon: PropTypes.elementType,
  subtitle: PropTypes.string,
  showForwardIcon: PropTypes.bool,
};

export default Cell;
