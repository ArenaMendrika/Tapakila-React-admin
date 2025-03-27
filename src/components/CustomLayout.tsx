import { Layout } from 'react-admin';
import CustomAppBar from './CustomAppBar';
import CustomSidebar from './CustomSideBar';

const CustomLayout = (props: any) => (
  <Layout {...props} appBar={CustomAppBar} sidebar={CustomSidebar} />
);

export default CustomLayout;