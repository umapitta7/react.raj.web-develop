import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import MenuListItem from './MenuListItem';
import { SignOutShape } from '../common/propTypes';

const SignOut = ({ iconColor, signout }) => {
  console.log("signout", signout)
  const { t } = useTranslation();

  return (
    <MenuListItem
      id='signout'
      label={t('Sign Out')}
      icon={<ExitToAppOutlinedIcon />}
      onClick={() => window.COSTCO.util.logoutSso(null, signout.ssoUrls, signout.ssoEnabled, signout.isMobile)}
      iconColor={iconColor}
    />
  );
}

SignOut.propTypes = {
  iconColor: PropTypes.bool, 
  signout: PropTypes.shape(SignOutShape).isRequired
}

SignOut.defaultProps = { iconColor: true }

export default SignOut
