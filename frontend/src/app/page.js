"use client";

import Head from 'next/head';
import Link from 'next/link';
import { FiClipboard, FiCheckCircle, FiMove } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Trello Lite</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        
        
        <section className="relative w-full max-w-5xl text-center py-20 px-6">
          
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 opacity-30 rounded-3xl transform -rotate-3 scale-110"></div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
            Welcome to <span className="text-blue-600">Trello Lite</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            A beginner-friendly project management app. Build, organize, and track your projects step-by-step with ease and efficiency.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!user ? (
              <>
                <Link href="/register" legacyBehavior>
                  <a className="bg-blue-600 text-white px-8 py-4 rounded-full shadow-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 font-semibold">
                    Get Started — Register
                  </a>
                </Link>
                <Link href="/login" legacyBehavior>
                  <a className="bg-white border border-gray-300 text-gray-800 px-8 py-4 rounded-full shadow hover:shadow-md hover:bg-gray-50 transform hover:scale-105 transition-all duration-300">
                    Already have an account? Login
                  </a>
                </Link>
              </>
            ) : (
              <Link href="/boards" legacyBehavior>
                <a className="bg-blue-600 text-white px-8 py-4 rounded-full shadow-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 font-semibold">
                  Go to Boards
                </a>
              </Link>
            )}
          </div>
        </section>

        
        <section className="mt-16 max-w-6xl w-full grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <FiClipboard className="text-blue-500 text-4xl mb-4" />
            <Link href="/boards">
              <h3 className="text-xl font-semibold mb-2">Create Boards</h3>
              <p className="text-gray-600">Organize your projects by creating multiple boards with ease.</p>
            </Link>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <FiCheckCircle className="text-green-500 text-4xl mb-4" />
            <Link href="/boards">
              <h3 className="text-xl font-semibold mb-2">Manage Tasks</h3>
              <p className="text-gray-600">Add tasks, assign them to users, and track progress efficiently.</p>
            </Link>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <FiMove className="text-purple-500 text-4xl mb-4" />
            <Link href="/boards">
              <h3 className="text-xl font-semibold mb-2">Drag & Drop</h3>
              <p className="text-gray-600">Easily move tasks between lists with a smooth drag-and-drop interface.</p>
            </Link>
          </div>
        </section>

        
        <section className="mt-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl p-12 max-w-5xl w-full text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to organize your projects?</h2>
          <p className="mb-6 text-lg md:text-xl">Join Trello Lite today and boost your productivity effortlessly.</p>
          <Link href="/boards" legacyBehavior>
            <a className="bg-white text-blue-600 px-8 py-4 rounded-full shadow-xl font-semibold hover:shadow-2xl hover:scale-105 transition-transform duration-300">
              Get Started Now
            </a>
          </Link>
        </section>

        
        <footer className="mt-24 mb-8 text-gray-500 text-sm text-center">
          &copy; {new Date().getFullYear()} Trello Lite. All rights reserved.
        </footer>
      </main>
    </>
  );
}
