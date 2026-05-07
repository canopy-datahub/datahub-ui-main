import React from 'react';
import PostAuth from '../../views/PostAuth/PostAuth';

const PostAuthPage = () => <PostAuth />;

// Intentionally no getServerSideProps. The user profile is fetched JWT-secured
// from CoreLayout via fetchUserProfile() once the page mounts; the legacy
// /user/infoBySession endpoint this page used to call no longer exists.

export default PostAuthPage;
