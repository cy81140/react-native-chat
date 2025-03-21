import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import ForwardIcon from '../assets/icons/forward.svg'; // Update this to import as XML string

const Cell = ({
  title,
  icon: Icon,
  tintColor,
  style,
  onPress,
  secondIcon: SecondIcon,
  subtitle,
  showForwardIcon = true,
}) => (
  <TouchableOpacity style={[styles.cell, style]} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: tintColor }]}>
      <Icon width={24} height={24} />
    </View>

    <View style={styles.textsContainer}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
    {showForwardIcon && (
      <View style={styles.forwardIcon}>
        {SecondIcon ? <SecondIcon width={20} height={20} /> : <SvgXml xml={ForwardIcon} width={20} height={20} />}
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
});

Cell.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  tintColor: PropTypes.string,
  style: PropTypes.object,
  onPress: PropTypes.func,
  secondIcon: PropTypes.elementType,
  subtitle: PropTypes.string,
  showForwardIcon: PropTypes.bool,
};

export default Cell;
