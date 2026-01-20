// import { useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Quote } from 'lucide-react';
import highlightImg from '/highlight.svg';
import coupleImg from '/images/couple.png';
import coupleImg2 from '/images/couple2.png';
import donBoscoImg from '/images/don_bosco.png';
import arugaImg from '/images/aruga.png';

const timeline = [
  ['1:00 pm', 'ceremony'],
  ['3:30 pm', 'photo taking'],
  ['4:30 pm', 'cocktail hour'],
  ['5:30 pm', 'reception'],
  ['8:00 pm', 'final send-off'],
];

function App() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const name = params.get('name');

  return (
    <div className="font-libre-baskerville relative mx-auto w-full max-w-350 px-0 sm:px-10 lg:px-18">
      <header className="border-divider flex w-full flex-col items-stretch border-b pt-3 pb-0 sm:border-black sm:pt-10 sm:pb-0 after:sm:mt-2 after:sm:mb-1 after:sm:w-full after:sm:border-b">
        <h3 className="font-poppins mb-4 text-center text-black/60 uppercase not-sm:hidden">John Vicencio - Jaynifer Sagana</h3>
        <div className="relative">
          <div className="@container relative flex w-full items-center select-none lg:absolute">
            <a href="#" className="mx-auto w-fit">
              <h1 className="font-chomsky w-fit text-3xl sm:text-4xl lg:text-6xl">The Proposal Post</h1>
            </a>
          </div>
          <div>
            <div className="font-poppins bg-divider/10 text-items border-divider mt-3 flex w-full justify-between border-t px-4 py-3 text-xs font-light sm:hidden sm:text-base lg:mt-0 lg:flex lg:border-t-0 lg:bg-transparent lg:px-0 lg:pt-1 lg:pb-0">
              <div className="flex flex-col gap-1">
                <p>Saturday, August 29, 2026</p>
                <p className="not-lg:hidden">RSVP Now</p>
              </div>
              <div>
                <p>Don Bosco Parish, Makati</p>
              </div>
            </div>
            <div className="font-poppins mt-6 flex w-full justify-center gap-12 text-lg font-light not-sm:hidden">
              <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black">RSVP</a>
              <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black">Venue</a>
              <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black">Dress Code</a>
              <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black">Lorem</a>
              <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black">Ipsum</a>
            </div>
          </div>
        </div>
      </header>
      <main className="@container px-4 sm:px-0">
        <h1 className="font-playfair-display my-8 text-center text-[clamp(1rem,10cqw,200rem)] font-bold sm:text-[clamp(1rem,6cqw,200rem)]">
          John & Jayni <br className="sm:hidden" /> Getting Married!
        </h1>
        <section className="flex flex-col border-y py-8 md:grid md:grid-cols-17">
          <div className="padding-4 col-span-12 flex flex-col pb-4 md:pr-4 md:pb-0">
            <div className="mb-10 flex flex-col items-start gap-4 lg:flex-row">
              <div className="text-items font-poppins w-full shrink grow-2 lg:w-1">
                <h3 className="font-libre-baskerville mb-5 text-2xl font-semibold text-black capitalize">
                  You're Cordially Invited To Share The Couple's Special Day
                </h3>
                <p>
                  Dear <span className="relative bg-yellow-200 font-bold text-black">Tito Jun & Coco</span>, the couple would love it if you
                  could make it to their wedding on <span className="font-bold text-black">August 29, 2026</span>
                </p>
                <a href="https://maps.app.goo.gl/6waU4P1bzqK6kfMy5">
                  <p className="text-sm text-blue-900 underline">Jump to RSVP</p>
                </a>
                <div className="border-divider my-5 border-l pl-4">
                  <Quote className="w-4 stroke-black/40" />
                  <p>I don't think we'd be able stop crying if they couldn't make it</p>
                </div>
                <p>The couple was quoted saying.</p>
              </div>
              <img src={coupleImg} className="w-full shrink grow-3 lg:w-1" />
            </div>
            <div className="border-divider flex items-start gap-4 border-t pt-10">
              <div className="text-items font-poppins w-1 shrink grow-2">
                <h3 className="font-libre-baskerville mb-5 text-2xl font-semibold text-black capitalize">
                  You're Cordially Invited To Share The Couple's Special Day
                </h3>
                <p>
                  Dear <span className="font-bold text-black">Tito Jun & Coco</span>, the couple would love it if you could make it to their
                  wedding on <span className="font-bold text-black">August 29, 2026</span>
                </p>
                <div className="border-divider my-5 border-l pl-4">
                  <Quote className="w-4 stroke-black/40" />
                  <p>I don't think we'd be able stop crying if they couldn't make it</p>
                </div>
                <p>The couple was quoted saying.</p>
              </div>
              <img src={coupleImg2} className="h-auto w-1 shrink grow-3 bg-cover" />
            </div>
          </div>
          <div className="border-divider text-items font-poppins col-span-5 border-t pt-4 pl-0 md:border-t-0 md:border-l md:pt-0 md:pl-4">
            <div>
              <img src={donBoscoImg} />
              <h3 className="font-libre-baskerville mt-5 mb-1 text-2xl font-semibold text-black capitalize">Ceremony Venue</h3>
              <p>Don Bosco Chapel Makati</p>
              <a href="https://maps.app.goo.gl/6waU4P1bzqK6kfMy5">
                <p className="text-sm text-blue-900 underline">Google Maps Link</p>
              </a>
            </div>
            <div className="mt-8">
              <img src={arugaImg} />
              <h3 className="font-libre-baskerville mt-5 mb-1 text-2xl font-semibold text-black capitalize">Ceremony Venue</h3>
              <p>Aruga Apartments by Rockwell</p>
              <a href="https://maps.app.goo.gl/cvjaYGtsLuF3TuXp6">
                <p className="text-sm text-blue-900 underline">Google Maps Link</p>
              </a>
            </div>
          </div>
        </section>
        <section className="flex items-center border-b py-8">
          <h2 className="font-playfair-display mr-8 px-12 text-center text-4xl font-bold italic sm:px-0 sm:text-2xl">
            Wedding <br />
            Timeline
          </h2>
          <div className="font-playfair grid w-full grid-cols-1 gap-8 text-xl sm:grid-cols-3 lg:flex">
            {timeline.map(([time, event]) => (
              <div className="flex grow flex-col items-center text-center">
                <p className="font-libre-baskerville font-bold">{time}</p>
                <p className="text-lg uppercase">{event}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <h1 className="mt-10 w-full text-center text-3xl font-bold">
        Your name is: <span className="capitalize">{name}</span>
      </h1>
    </div>
  );
}

export default App;
