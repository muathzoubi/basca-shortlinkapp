'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { createShortLink } from './short';
// This is a mock function to generate a short code
const generateShortCode = () => {
  return Math.random().toString(36).substring(2, 8);
};

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const id = await createShortLink(longUrl);
      setShortUrl(`${window.location.origin}/${id}`);
    } catch (error) {
      console.error('Error creating short link:', error);
    }
    setIsLoading(false);
    setError('');
    setShortUrl('');

    if (!longUrl) {
      setError('Please enter a URL');
      return;
    }

    try {
      new URL(longUrl);
    } catch {
      setError('Please enter a valid URL');
      return;
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center  p-14">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[160px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={20}
          priority
        />
      </div>

      <div className=" grid text-center lg:max-w-5xl lg:w-full lg:mb-0 g:text-left">
        <div className="card backdrop-blur">
          <div className="flex min-h-full flex-1 flex-col justify-center px-2 py-2 lg:px-8">
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className=" pb-2 sm:text-xl">Short Link Generator</h2>

                  <div className="mt-2">
                    <input
                      id="short"
                      name="short"
                      type="url"
                      onChange={(e) => setLongUrl(e.target.value)}
                      placeholder="Enter your long URL"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    onSubmit={(e) => {
                      handleSubmit(e).then(() => {
                        setIsLoading(false);
                      });
                    }}
                  >
                    {isLoading ? 'Generating...' : 'Generate'}
                  </button>
                </div>
              </form>
              <div className="card bg-white rounded my-4 flex items-center py-6 px-1">
                <p className=" text-center text-sm/7 text-gray-500">
                  Your short URL:
                  <span className="text-red-500">{shortUrl}</span>
                </p>
                <svg
                  className="opacity-20 hover:opacity-100"
                  style={{ marginLeft: 'auto', cursor: 'pointer' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20.9983 10C20.9862 7.82497 20.8897 6.64706 20.1213 5.87868C19.2426 5 17.8284 5 15 5H12C9.17157 5 7.75736 5 6.87868 5.87868C6 6.75736 6 8.17157 6 11V16C6 18.8284 6 20.2426 6.87868 21.1213C7.75736 22 9.17157 22 12 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V15"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 10V16C3 17.6569 4.34315 19 6 19M18 5C18 3.34315 16.6569 2 15 2H11C7.22876 2 5.34315 2 4.17157 3.17157C3.51839 3.82475 3.22937 4.69989 3.10149 6"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
