import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loggedIn, loggedUserName, signOut } from '../store/reducers/user';

export default function Navbar() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(loggedIn);
    const name = useAppSelector(loggedUserName);

    function handleSignInOrOut() {
        if (isLoggedIn) {
            dispatch(signOut());
            return router.reload();
        }

        return router.push('/sign-in');
    }

    return (
        <>
            <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-700 mx-auto pt-8 pb-8 sm:pb-16 bg-gray-900 bg-opacity-60 text-gray-100">
                <div className="ml-[-0.60rem]">
                    <h1 className="font-bold text-3xl tracking-tight mb-1 text-white">
                        {isLoggedIn ? `Hello, ${name}!` : 'Hello'}
                    </h1>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        aria-label="Sign In"
                        type="button"
                        className="w-20 h-9 rounded-lg bg-gray-600 hover:ring-2 ring-gray-300 transition-all"
                        onClick={handleSignInOrOut}>
                        {isLoggedIn ? 'Sign Out' : 'Sign In'}
                    </button>
                    {!isLoggedIn && (
                        <Link href="sign-up">
                            <button
                                aria-label="Sign In"
                                type="button"
                                className="w-20 h-9 ml-4 rounded-lg bg-gray-600 hover:ring-2 ring-gray-300 transition-all">
                                Sign Up
                            </button>
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
}
