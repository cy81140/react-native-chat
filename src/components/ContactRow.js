import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { lightColors } from '../config/constants'; // Import default colors

const ContactRow = ({
  name,
  subtitle,
  onPress,
  style,
  onLongPress,
  selected,
  showForwardIcon = true,
  subtitle2,
  newMessageCount,
}) => {
  const theme = useTheme();
  const colors = theme?.colors || lightColors;
  
  return (
    <TouchableOpacity 
      style={[
        styles.row, 
        { 
          backgroundColor: '#FFFFFF',  // Force white background
          borderWidth: 1,
          borderColor: '#E2E8F0',
        },
        style
      ]} 
      onPress={onPress} 
      onLongPress={onLongPress}
    >
      <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
        <Text style={[styles.avatarLabel, { color: '#FFFFFF' }]}>
          {name
            .trim()
            .split(' ')
            .reduce((prev, current) => `${prev}${current[0]}`, '')}
        </Text>
      </View>

      <View style={styles.textsContainer}>
        <Text style={[styles.name, { color: '#000000' }]}>{name}</Text>
        <Text style={[styles.subtitle, { color: '#666666' }]}>{subtitle}</Text>
      </View>

      <View style={styles.rightContainer}>
        <Text style={[styles.subtitle2, { color: '#666666' }]}>{subtitle2}</Text>

        {newMessageCount > 0 && (
          <View style={[styles.newMessageBadge, { backgroundColor: colors.error }]}>
            <Text style={[styles.newMessageText, { color: '#FFFFFF' }]}>{newMessageCount}</Text>
          </View>
        )}

        {selected && (
          <View style={[styles.overlay, { backgroundColor: colors.primary }]}>
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          </View>
        )}

        {showForwardIcon && <Ionicons name="chevron-forward" size={20} color="#666666" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    backgroundColor: '#FFFFFF',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    } : Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    })),
  },
  avatar: {
    alignItems: 'center',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  avatarLabel: {
    fontSize: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',  // Increased font weight for better visibility
    marginBottom: 4,
    color: '#000000',  // Enforce black text color
  },
  newMessageBadge: {
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
  },
  newMessageText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  overlay: {
    alignItems: 'center',
    borderRadius: 11,
    height: 22,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 22,
    borderWidth: 1.5,
    borderColor: 'black',
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
    color: '#666666',  // Enforce dark gray for subtitle
  },
  subtitle2: {
    fontSize: 12,
    marginBottom: 4,
    color: '#666666',  // Enforce dark gray for subtitle2
  },
  textsContainer: {
    flex: 1,
    marginStart: 16,
  },
});

ContactRow.propTypes = {
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  onLongPress: PropTypes.func,
  selected: PropTypes.bool,
  showForwardIcon: PropTypes.bool,
  subtitle2: PropTypes.string,
  newMessageCount: PropTypes.number,
};

export default ContactRow;
