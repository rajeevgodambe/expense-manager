import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    safeArea: {
        flex: 1,
    },
    alignCenter: {
        alignItems: 'center'
    },
    gap12: {
        gap: 12
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
