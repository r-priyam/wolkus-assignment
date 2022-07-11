import { useState } from 'react';
import { useRouter } from 'next/router';
import Container from '../components/Container';
import { useAppDispatch } from '../store/hooks';
import { signUp } from '../store/reducers/user';

export default function SignUp() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [credentials, setCredentials] = useState({ userName: '', password: '' });

    function handleSignUp() {
        const currentUsers = JSON.parse(localStorage.getItem('users')!) as Record<string, string>;

        if (currentUsers.hasOwnProperty(credentials.userName.toLowerCase())) {
            alert('Username is taken, pick a unique one!');
            return;
        }

        dispatch(signUp({ userName: credentials.userName, password: credentials.password }));
        return router.push('/');
    }

    return (
        <Container>
            <div className="flex flex-col justify-center max-w-2xl mx-auto mb-16">
                <h1 className="mb-4 text-3xl text-center font-bold tracking-tight text-black text-white">
                    Sign Up
                </h1>
                <div className="w-96">
                    <div>
                        <label htmlFor="user-name" className="text-base text-gray-200">
                            Username
                        </label>
                        <input
                            id="user-name"
                            name="username"
                            type="text"
                            required
                            className="mt-2 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                            placeholder="User Name"
                            onChange={(event) =>
                                setCredentials((data) => ({
                                    ...data,
                                    userName: event.target.value
                                }))
                            }
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="password" className="text-base text-gray-200">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="mt-2 block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                            placeholder="Password"
                            onChange={(event) =>
                                setCredentials((data) => ({
                                    ...data,
                                    password: event.target.value
                                }))
                            }
                        />
                    </div>

                    <div className="mt-4">
                        <button
                            type="button"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-100 dark:bg-gray-700 text-gray-100 py-2 px-4 text-sm font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            onClick={handleSignUp}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    );
}
