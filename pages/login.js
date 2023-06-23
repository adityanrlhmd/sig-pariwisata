import { getSupabase } from '@/utils/supabase';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

const Login = () => {
  const router = useRouter();
  const supabase = getSupabase();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setIsLoading(false);

      if (error) return error;

      if (data.session !== null) {
        router.push('/dashboard');
      }
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };
  return (
    <main className={` min-h-screen bg-cover ${inter.className}`} style={{ backgroundImage: 'url(img/istawali.jpg)' }}>
      <div className=" min-h-screen py-32 bg-gray-500 bg-opacity-10 backdrop-blur-sm">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
          <h3 className="text-center p-4 text-lg">Welcome Admin</h3>
          <form onSubmit={onSubmit} className="card-body">
            <div className="form-control">
              <input type="text" placeholder="Email" className="input input-bordered" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-control">
              <input type="password" placeholder="password" className="input input-bordered" onChange={(e) => setPassword(e.target.value)} />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button disabled={isLoading} className="btn btn-primary">
                {isLoading ? 'Loading' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
