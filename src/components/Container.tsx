import Head from 'next/head';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setUsers, signIn } from '../store/reducers/user';
import Navbar from './Navbar';

export default function Container(props: any) {
    const { children, ...customMeta } = props;
    const dispatch = useAppDispatch();

    useEffect(() => {
        const users = localStorage.getItem('users');
        if (!users) return localStorage.setItem('users', JSON.stringify({}));
        dispatch(setUsers(JSON.parse(users)));
    }, [dispatch]);

    useEffect(() => {
        const cachedUser = JSON.parse(
            localStorage.getItem('logged-in') || '{"loggedIn": false, "name": ""}'
        ) as {
            loggedIn: boolean;
            name: string;
        };

        if (cachedUser.loggedIn) dispatch(signIn(cachedUser.name));
    }, [dispatch]);

    const meta = {
        title: 'Wolkus Technology - Assignment',
        description: 'Assignment created for wolkus technology front-end dev job',
        type: 'website',
        ...customMeta
    };

    return (
        <div className="bg-gray-900 min-h-screen">
            <Head>
                <title>{meta.title}</title>
                <meta content={meta.description} name="description" />
                <meta property="og:type" content={meta.type} />
            </Head>
            <div className="flex flex-col justify-center px-8">
                <div className="ml-[-0.60rem]">
                    <Navbar />
                </div>
            </div>
            <main className="flex flex-col justify-center px-8 bg-gray-900">{children}</main>
        </div>
    );
}
