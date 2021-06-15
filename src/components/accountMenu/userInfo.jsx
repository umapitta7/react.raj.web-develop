import { Toolbar, Grid, IconButton } from "@material-ui/core"
import styled from "styled-components"
import Text from "forge-components/dist/components/Text"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import { X } from 'forge-components/dist/icons';

import Gold from "./gold.svg"
import business from "./business.svg"
import Executive from "./executive.svg"
import IconLabel from "./IconLabel";

const StyledCloseIconButton = styled(IconButton)`
  float: right;
  margin-right: 2px;
`

const StyledUserInfo = styled(Toolbar)`
  padding: 5px;
  margin-left: 8px;
`

const StyledLogo = styled.img`
  width: 60px;
  height: 46px;
  padding-bottom: 20px;
  padding-right: 8px;
`
const StyledText = styled(Text)`
  padding: 5px;
  margin: 5px;
`
const userName = "Jane"
const memSince = "2001"
const NON_MEMBER = true
const GOLD_STAR = { logo: Gold, text: "Gold Star" }
const GOLD_STAR_EXECUTIVE = { logo: Gold, text: "Gold Star Executive" }
const BUSINESS_MEMBER = { logo: business, text: "Business" }
const BUSINESS_MEMBER_EXECUTIVE = {
  logo: Executive,
  text: "Business Executive ",
}
const bcList = {
  nonMember: NON_MEMBER,
  goldStar: GOLD_STAR,
  goldStarExecutive: GOLD_STAR_EXECUTIVE,
  businessMembers: BUSINESS_MEMBER,
  businessMembersExecutive: BUSINESS_MEMBER_EXECUTIVE,
}
const bdList = {
  nonMember: NON_MEMBER,
  goldStar: GOLD_STAR,
  goldStarExecutive: GOLD_STAR_EXECUTIVE,
  businessMembers: BUSINESS_MEMBER,
  businessMembersExecutive: BUSINESS_MEMBER_EXECUTIVE,
}

const Config = {
  bc: bcList,
  bd: bdList,
}

const CloseButton = ({ onClose }) => onClose && <StyledCloseIconButton
  aria-label="close button"
  color="primary"
  onClick={onClose}
>
  <IconLabel svg={<X />} iconColor="blue.500" width={20} height={20} />
</StyledCloseIconButton>

//TODO: need to get costco image from forge-components
const UserInfo = ({ userType, type, onClose }) => {
  const { t } = useTranslation();
  return (
    <StyledUserInfo disableGutters>
      <Grid container>
        {NON_MEMBER ?
          <Grid container item xs={12}>
            <Grid item xs={9}>
              <StyledText variant="t4" >{t('Welcome!')}</StyledText>
            </Grid>
            <Grid item xs={3}>
              <CloseButton onClose={onClose} />
            </Grid>
          </Grid> :
          <>
            <Grid container item xs={12}>
              <Grid item xs={9}>
                <Text style={{ paddingTop: 10 }} variant="t4">
                  {t(`Hello, ${userName}!`)}
                </Text>
              </Grid>
              <Grid item xs={3}>
                <CloseButton onClose={onClose} />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              style={{ height: 64, marginTop: -4, paddingTop: 8 }}
            >
              <Grid item xs={3}>
                <StyledLogo src={Config[type][userType].logo} alt="logo" />
              </Grid>
              <Grid item xs={8}>
                <Text as="p">{t(`${Config[type][userType].text} Members`)}</Text>
                <Text as="p">{t(`Member Since ${memSince}`)}</Text>
              </Grid>
            </Grid>
          </>
        }
      </Grid>
    </StyledUserInfo>)
}

UserInfo.defaultProps = {
  userType: "goldStar",
  type: "bd",
  onClose: null
}

UserInfo.propTypes = {
  type: PropTypes.oneOf(["bd", "bc"]),
  onClose: PropTypes.func,
  userType: PropTypes.oneOf([
    "nonMember",
    "goldStar",
    "goldStarExecutive",
    "businessMembers",
    "businessMembersExecutive",
  ]),
}

export default UserInfo
