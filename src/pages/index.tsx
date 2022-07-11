import { useState } from 'react';
import Image from 'next/image';
import Container from '../components/Container';
import { useAppSelector } from '../store/hooks';
import { loggedIn } from '../store/reducers/user';

export default function Home() {
    const isLoggedIn = useAppSelector(loggedIn);
    const [searchName, setSearchName] = useState('');
    const [movieData, setMovieData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function searchMovie() {
        setLoading(true);
        setError(false);

        const baseUrl = `https://www.omdbapi.com/?s=${searchName}&type=movie&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`;
        const response = await fetch(baseUrl);
        const data = await response.json();

        if (!data['Search']) {
            setLoading(false);
            setError(true);
            return;
        }

        setMovieData(data['Search']);
        setSearchName('');
        setLoading(false);
    }

    return (
        <Container>
            {!isLoggedIn && (
                <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
                    <h1 className="text-red-400 text-2xl font-bold">
                        Please login first to see the homepage contents
                    </h1>
                </div>
            )}

            {isLoggedIn && (
                <>
                    <div className="flex flex-col justify-center max-w-2xl mx-auto mb-16">
                        <div className="w-96">
                            <input
                                required
                                placeholder="Enter movie name"
                                onChange={(event) => setSearchName(event.target.value)}
                                className="mt-2 block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                            />
                        </div>
                        <button
                            aria-label="Search Movie"
                            type="button"
                            onClick={searchMovie}
                            className="group relative flex w-96 mt-4 justify-center rounded-md border border-transparent bg-gray-100 dark:bg-gray-700 text-gray-100 py-2 px-4 text-sm font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                            Search Movie
                        </button>
                    </div>
                    {loading && (
                        <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
                            <h1 className="text-green-400 text-2xl font-bold">Searching...</h1>
                        </div>
                    )}
                    {error && (
                        <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
                            <h1 className="text-red-400 text-2xl font-bold">
                                Something went wrong or no result found, please try again!
                            </h1>
                        </div>
                    )}
                    {!loading && (
                        <div className="flex flex-wrap justify-around">
                            {movieData?.length &&
                                movieData.map((data, index) => (
                                    <div
                                        className="w-48 bg-gray-500 hover:bg-gray-600 p-3 rounded-md mt-2"
                                        key={index}>
                                        <Image
                                            src={data['Poster']}
                                            alt={data['Title']}
                                            height={200}
                                            width={170}
                                            className="object-center"
                                        />
                                        <h3 className="text-gray-300 text-base font-bold">
                                            {data['Title']}
                                        </h3>
                                    </div>
                                ))}
                        </div>
                    )}
                </>
            )}
        </Container>
    );
}
