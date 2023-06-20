import React from 'react';
import Link from 'next/link';

const NavAdmin = () => {
  return (
    <div className="">
      <div className="px-24 fixed navbar bg-white backdrop-blur-sm bg-opacity-50 shadow-md w-full right-0 left-0">
        <div className="flex-1">
          <img className="object-contain aspect-[4/3] w-16" src="img/logo.png" alt="" />
        </div>
        <div>
          <p className="p-2 text-sm">Admin Ganteng</p>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="img/profile.jpg" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <Link href="/">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavAdmin;
