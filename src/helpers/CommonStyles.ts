import {StyleSheet} from 'react-native';
import FontConfig from '../constants/FontConfig';
import Colors from '../constants/Colors';

const CommonStyles = StyleSheet.create({
  pageTitle: {
    fontFamily: FontConfig.Lato.bold,
    fontSize: 24,
    color: Colors.textDark,
  },
  pageTitleWrapper: {marginVertical: 10},
  bodyText: {
    fontFamily: FontConfig.Lato.regular,
    fontSize: 16,
  },
  flex: {
    flex: 1,
  },
  flexGrowOne: {
    flexGrow: 1,
  },
  flexZero: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexLeftCenter: {flex: 1, alignItems: 'flex-start', justifyContent: 'center'},
  paddingBottom: {
    paddingBottom: 5,
  },
  horizontalLine: {
    height: 2,
    backgroundColor: Colors.borderColor,
  },
  backButtonWrapper: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  formikMarginVertical: {
    marginVertical: 20,
  },
  buttonStyle: {marginHorizontal: 100, borderRadius: 50},
  backButtonStyle: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  backButtonTextStyle: {
    color: Colors.textOnPrimary,
    fontFamily: FontConfig.NunitoSans.semiBold,
  },
  formLabelTextStyle: {
    fontFamily: FontConfig.Lato.bold,
    fontSize: 15,
  },
  topRadiusStyle: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  }
});
export default CommonStyles;
