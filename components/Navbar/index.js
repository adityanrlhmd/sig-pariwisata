import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 z-10 flex items-center w-full bg-transparent">
      <div className="container">
        <div className="relative flex items-center justify-between">
          <div className="px-4">
            <Link href="/" className="block py-4">
              <img className=' mix-blend-color-burn object-contain aspect-[4/3] w-32' src="https://cdn.antaranews.com/cache/800x533/2014/01/logo-kab-sukabumi-1.jpg" alt="" />
            </Link>
          </div>
          <div className="flex items-center px-4">
            <button id="hamburger" name="hamburger" type="button" className="absolute block right-4 lg:hidden">
              <span className="transition duration-300 ease-in-out origin-top-left hamburger-line"></span>
              <span className="transition duration-300 ease-in-out hamburger-line"></span>
              <span className="transition duration-300 ease-in-out origin-bottom-left hamburger-line"></span>
            </button>
            <nav id="nav-menu" className="hidden absolute py-5 bg-white shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none">
              <ul className="block lg:flex">
                <li className="group">
                  <Link href="/" className="flex py-2 mx-8 text-base font-semibold text-dark group-hover:text-primary">Home</Link>
                </li>
                <li className="group">
                  <Link href="data-wisata" className="flex py-2 mx-8 text-base font-semibold text-dark group-hover:text-primary">Data Wisata</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar