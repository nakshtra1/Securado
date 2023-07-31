import { useSelector } from 'react-redux';
import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../../e-commerce/store';
import ChangePasswordHeader from './ChangePasswordHeader';
import ChangePasswordBody from './ChangePasswordBody';
function ChangePassword() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<ChangePasswordHeader/>}
      content={<ChangePasswordBody/>}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}
// export default UserList
export default withReducer('eCommerceApp', reducer)(ChangePassword);