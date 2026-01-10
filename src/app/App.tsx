// import { useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function App() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const name = params.get('name');

  return (
    <div className="relative w-full px-18">
      <header className="flex w-full flex-col items-stretch border-b pt-10 after:mt-2 after:mb-1 after:w-full after:border-b">
        <h3 className="font-poppins mb-4 text-center text-black/60 uppercase">John Vicencio - Jaynifer Sagana</h3>
        <div className="relative">
          <div className="absolute flex w-full items-center select-none">
            <a href="#" className="mx-auto w-fit">
              <h1 className="font-chomsky w-fit text-6xl">The Proposal Post</h1>
            </a>
          </div>
          <div>
            <div className="font-poppins flex w-full justify-between pt-1 font-light">
              <div className="flex flex-col gap-1">
                <p>Saturday, August 29, 2026</p>
                <p>RSVP Now</p>
              </div>
              <div>
                <p>Don Bosco Parish, Makati</p>
              </div>
            </div>
            <div className="font-poppins mt-6 flex w-full justify-center gap-12 text-lg font-light">
              <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black">RSVP</a>
              <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black">Venue</a>
              <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black">Dress Code</a>
              <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black">Lorem</a>
              <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black">Ipsum</a>
            </div>
          </div>
        </div>
      </header>
      <h1 className="mt-10 w-full text-center text-3xl font-bold">
        Your name is: <span className="capitalize">{name}</span>
      </h1>
    </div>
  );
}

export default App;
