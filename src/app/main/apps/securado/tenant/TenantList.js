import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../../e-commerce/store';
// import ProductsHeader from '../e-commerce/products/ProductsHeader';
// import ProductsTable from '../../e-commerce/products/ProductsTable';
import TenantHeader from './TenantHeader';
import TenantTable from './TenantTable';

import { useSelector } from 'react-redux';

function TenantList() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<TenantHeader />}
      content={<TenantTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}
// export default UserList
export default withReducer('eCommerceApp', reducer)(TenantList);
