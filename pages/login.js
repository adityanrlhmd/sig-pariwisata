import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Login = () => {
  return (
    <main className={` min-h-screen bg-cover ${inter.className}`} style={{ backgroundImage: 'url(img/istawali.jpg)' }}>
      <div className=" min-h-screen py-32 bg-gray-500 bg-opacity-10 backdrop-blur-sm">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
          <h3 className="text-center p-4 text-lg">Welcome Admin</h3>
          <div className="card-body">
            <div className="form-control">
              <input type="text" placeholder="Username" className="input input-bordered" />
            </div>
            <div className="form-control">
              <input type="text" placeholder="password" className="input input-bordered" />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
