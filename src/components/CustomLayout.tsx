import { Layout } from 'react-admin';
import CustomAppBar from './CustomAppBar';

const CustomLayout = (props: any) => <Layout {...props} appBar={CustomAppBar} />;

export default CustomLayout;
