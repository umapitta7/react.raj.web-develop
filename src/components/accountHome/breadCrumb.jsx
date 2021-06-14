import styled from 'styled-components';
import Text from 'forge-components/dist/components/Text';
import Breadcrumbs from 'forge-components/dist/components/Breadcrumbs';
import { accountHomeUrl } from '../common/myAccount/accountLinks';

const StyledBreadcrumbs = styled.div`

  padding-top: 24px;
  margin: 5px;
`;

const StyledText = styled(Text)`
  padding-top: 24px;
  padding-bottom: 16px;
`;

const Breadcrumb = () => (
  <StyledBreadcrumbs>
    <Breadcrumbs separator="/">
      <a href="/">Home</a>
      <a href={accountHomeUrl}>Account Home</a>
    </Breadcrumbs>
    <StyledText variant="t5">Account Home</StyledText>
  </StyledBreadcrumbs>
);

export default Breadcrumb;
