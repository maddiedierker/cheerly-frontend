import { StyleSheet } from 'react-native'
import colors from './colors'

export const commonStyles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  header: {
    fontSize: 24,
    color: colors.brownishGrey,
  },
  subtitle: {
    fontSize: 16,
    paddingTop: 10,
    color: colors.brownishGrey,
  }
})

export const formStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  horizontalRule: {
    width: 28,
    height: 1,
    borderWidth: 0.5,
    borderColor: colors.black,
  },
  header: {
    fontSize: 18,
    color: colors.black,
    marginHorizontal: 10,
  },
  input: {
    fontSize: 18,
    width: '75%',
    height: 65,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.warmGrey,
    backgroundColor: colors.whiteFour,
    color: colors.black,
  },
  button: {
    width: '75%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.black,
    backgroundColor: colors.aquamarine,
    color: colors.black,
  },
  text: {
    fontSize: 18,
  },
})
