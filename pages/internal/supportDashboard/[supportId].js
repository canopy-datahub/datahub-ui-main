import InternalSupportRequestInfoPage from '../../../views/Internal/[SupportId]';

const InternalSupportRequestPage = (props) => <InternalSupportRequestInfoPage {...props} />;

export async function getServerSideProps(context) {
    const { params } = context;
    return {
        props: {
            supportId: params.supportId,
            pageTitle: 'Support Request',
        },
    };
}

export default InternalSupportRequestPage;
