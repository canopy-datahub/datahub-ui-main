import SupportRequestInfoPage from '../../views/SupportDashboard/[SupportId]';

const SupportRequestPage = (props) => <SupportRequestInfoPage {...props} />;

export async function getServerSideProps(context) {
    const { params } = context;
    return {
        props: {
            supportId: params.supportId,
            pageTitle: 'Support Request',
        },
    };
}

export default SupportRequestPage;
