import { StyleSheet } from 'react-native'
import colors from './colors'

export const formStyles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 90,
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