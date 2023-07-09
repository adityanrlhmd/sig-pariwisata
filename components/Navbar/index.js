import Link from 'next/link';
import React, { useEffect } from 'react';

const Navbar = () => {
  useEffect(() => {
    // Navbar Fixed
    window.onscroll = function () {
      const header = document.querySelector('header');
      if (header) {
        const navFixed = header.offsetTop;

        if (window.pageYOffset > navFixed) {
          header.classList.add('navbar-fixed');
        } else {
          header.classList.remove('navbar-fixed');
        }
      }
    };

    // Hamburger
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#nav-menu');

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('hamburger-active');
      navMenu.classList.toggle('hidden');
    });
  }, []);
  return (
    <header className=" absolute top-0 left-0 z-10 flex items-center w-full bg-transparent">
      <div className="container">
        <div className="relative flex items-center justify-between">
          <div className="px-4">
            <Link href="/" className="block py-2">
              <img className=" object-contain aspect-[4/3] w-16" src="../img/logo.png" alt="Logo" />
            </Link>
          </div>
          <div className="flex items-center px-4">
            <button id="hamburger" name="hamburger" type="button" className="absolute block right-4 lg:hidden">
              <span className="transition duration-300 ease-in-out origin-top-left hamburger-line"></span>
              <span className="transition duration-300 ease-in-out hamburger-line"></span>
              <span className="transition duration-300 ease-in-out origin-bottom-left hamburger-line"></span>
            </button>
            <nav id="nav-menu" className="hidden absolute py-5  bg-white shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none ">
              <ul className="block lg:flex menu menu-horizontal">
                <li className="group">
                  <Link href="/" className="flex uppercase rounded-md hover:bg-white py-2 mx-4 text-sm font-semibold text-black lg:text-white group-hover:text-primary ">
                    Home
                  </Link>
                </li>
                <li className="group">
                  <Link href="/data-wisata" className="flex uppercase rounded-md hover:bg-white py-2 mx-4 text-sm font-semibold text-black lg:text-white group-hover:text-primary">
                    Data Wisata
                  </Link>
                </li>
                <li className="group">
                  <Link href="/login" className="flex uppercase rounded-md hover:bg-white py-2 mx-4 text-sm font-semibold text-black lg:text-white group-hover:text-primary">
                    Login
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
