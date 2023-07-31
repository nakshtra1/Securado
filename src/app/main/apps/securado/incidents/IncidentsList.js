import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../../e-commerce/store';
// import ProductsHeader from '../e-commerce/products/ProductsHeader';
// import ProductsTable from '../../e-commerce/products/ProductsTable';
import IncidentsHeader from './IncidentsHeader';
import IncidentsTable from './IncidentsTable';

function IncidentsList() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<IncidentsHeader />}
      content={<IncidentsTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}
// export default UserList
export default withReducer('eCommerceApp', reducer)(IncidentsList);
