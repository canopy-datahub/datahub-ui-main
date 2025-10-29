/* eslint-disable react/prop-types */
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/globals.scss';
import CoreLayout from '../components/CoreLayout/CoreLayout';
import { ParallaxProvider } from 'react-scroll-parallax';
import '@fontsource-variable/open-sans';
import { useRouter } from 'next/router';
import { useStore } from '../store/store';
import { useEffect, useRef } from 'react';
import { hideLoading, showLoading } from '../store/environment/environmentSlice';
import { SSRProvider } from 'react-bootstrap';
import { GoogleAnalytics } from '@next/third-parties/google';

function Application({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState);
    const router = useRouter();
    pageProps.baseUrl = process.env.NEXT_PUBLIC_DEV_URL;

    useEffect(() => {
        const start = () => {
            store.dispatch(showLoading());
        };
        const end = () => {
            store.dispatch(hideLoading());
        };
        router.events.on('routeChangeStart', start);
        router.events.on('routeChangeComplete', end);
        router.events.on('routeChangeError', end);
        return () => {
            router.events.off('routeChangeStart', start);
            router.events.off('routeChangeComplete', end);
            router.events.off('routeChangeError', end);
        };
    }, [router]);

    // const usePreviousRoute = () => {
    //     const { asPath } = useRouter();

    //     const ref = useRef(null);

    //     useEffect(() => {
    //       ref.current = asPath;
    //     }, [asPath]);

    //     return ref.current;
    //   };

    return (
        <SSRProvider>
            <ParallaxProvider>
                <Provider store={store}>
                    <CoreLayout {...pageProps}>
                        <Component {...pageProps} />
                    </CoreLayout>
                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTAG} />
                </Provider>
            </ParallaxProvider>
        </SSRProvider>
    );
}
Application.propTypes = {
    Component: PropTypes.any.isRequired,
    pageProps: PropTypes.object.isRequired,
};
export default Application;
