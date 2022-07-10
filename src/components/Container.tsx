import Head from 'next/head';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function Container(props: any) {
    const { children, ...customMeta } = props;
    const [loggedUser, setLoggedUser] = useState({ loggedIn: false, name: '' });

    useEffect(() => {
        const users = localStorage.getItem('users');
        if (!users) localStorage.setItem('users', JSON.stringify({}));

        const cachedUser = JSON.parse(
            localStorage.getItem('logged-in') || '{"loggedIn": false, "name": ""}'
        ) as {
            loggedIn: boolean;
            name: string;
        };
        setLoggedUser(() => cachedUser);
    }, []);

    const meta = {
        title: 'Wolkus Technology - Assignment',
        description: 'Assignment created for wolkus technology front-end dev job',
        type: 'website',
        ...customMeta
    };

    return (
        <div className="bg-gray-900">
            <Head>
                <title>{meta.title}</title>
                <meta content={meta.description} name="description" />
                <meta property="og:type" content={meta.type} />
            </Head>
            <div className="flex flex-col justify-center px-8">
                <div className="ml-[-0.60rem]">
                    <Navbar loggedUser={loggedUser} />
                </div>
            </div>
            <main className="flex flex-col justify-center px-8 bg-gray-900">{children}</main>
        </div>
    );
}
