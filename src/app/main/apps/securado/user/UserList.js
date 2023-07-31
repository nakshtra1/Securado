import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../../e-commerce/store';
// import ProductsHeader from '../e-commerce/products/ProductsHeader';
// import ProductsTable from '../../e-commerce/products/ProductsTable';
import UserHeader from './UserHeader';
import UserTable from './UserTable';

function UserList() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<UserHeader />}
      content={<UserTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('eCommerceApp', reducer)(UserList);
