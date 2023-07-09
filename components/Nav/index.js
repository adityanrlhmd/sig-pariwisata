import React from 'react';
import { BiMenu } from 'react-icons/bi';
import Link from 'next/link';
import { useEffect } from 'react';
import { BsBoxArrowInRight } from 'react-icons/bs';
import { RiAdminFill } from 'react-icons/ri';

export default function Nav() {
  return (
    <nav className="navbar px-10 z-[9998] fixed bg-slate-800 backdrop-blur-sm bg-opacity-50 shadow-md w-full">
      <div className="navbar-start">
        <Link href="/" className="block py-2">
          <img className=" object-contain aspect-[4/3] w-16" src="../img/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="navbar-end">
        <div className="invisible lg:visible px-4">
          <ul tabIndex={0} className="menu menu-horizontal gap-4 text-sm text-white">
            <li>
              <Link href="/" className="hover:bg-white uppercase rounded-md hover:text-primary font-semibold">
                Home
              </Link>
            </li>
            <li>
              <Link href="/data-wisata" className="hover:bg-white uppercase rounded-md hover:text-primary font-semibold">
                Data Wisata
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:bg-white rounded-md hover:text-primary font-semibold">
                <RiAdminFill color="blue" className="w-5 h-5" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="dropdown lg:dropdown-none lg:hidden">
          <label tabIndex={0} className="btn btn-ghost hover:bg-white hover:bg-opacity-20 btn-circle">
            <BiMenu className="w-8 h-8" color="white" />
          </label>
          <ul tabIndex={0} className="top-14 menu menu-sm gap-2 right-0 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href="/" className="font-semibold uppercase">
                Home
              </Link>
            </li>
            <li>
              <Link href="/data-wisata" className="font-semibold uppercase">
                Data Wisata
              </Link>
            </li>
            <li>
              <Link href="/login" className="font-semibold">
                <RiAdminFill color="blue" className="w-5 h-5" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
