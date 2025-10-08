import React from 'react';
import UserAdvisoryBoard from '../../views/UserAdvisoryBoard/UserAdvisoryBoard';

const UABPage = (props) => <UserAdvisoryBoard {...props} />;

export async function getServerSideProps() {
    return {
        props: {
            pageTitle: 'User Advisory Board',
        },
    };
}

export default UABPage;
