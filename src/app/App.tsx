import { MouseEvent, useState, useMemo } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { format, getDaysInMonth } from 'date-fns';
import { useAtom } from 'jotai';
import { Guest, GuestRSVP } from '@/features/dashboard/types';
import { useGuest } from '@/features/guests/hooks/useGuest';
import { useUpdateGuest } from '@/features/guests/hooks/useSetGuest';
import { guestAtom } from '@/store/store';
import toast from 'react-hot-toast';

import { CircleAlert, LoaderCircle } from 'lucide-react';
import RSVP from './routes/Invite/RSVP';
import WeddingParty from './routes/Invite/WeddingParty';

import { Quote } from 'lucide-react';
import coupleImg from '/images/couple.png';
import donBoscoImg from '/images/don_bosco.png';
import arugaImg from '/images/aruga.png';
import storyOfUsImg from '/images/story-of-us.png';
import rsvpRImg from '/images/RSVP-R.png';
import flourishR from '/images/flourish-r.svg';
import flourishL from '/images/flourish-l.svg';
import brownImg from '/images/brown.png';
import greenImg from '/images/green.png';
import mushroomImg from '/images/mushroom.png';
import attireSamples from '/images/clothes/samples.png';
import honeymoonFund from '/images/honeymoon-fund.png';
import luunaMilo from '/images/luuna-milo.png';
import { useWidthCheck } from '@/hooks/useWidthCheck';

const timeline = [
  ['2:00 pm', 'ceremony'],
  ['3:30 pm', 'photo taking'],
  ['4:30 pm', 'cocktail hour'],
  ['5:30 pm', 'reception'],
  ['8:00 pm', 'final send-off'],
];

const invitees = [{ name: 'Eduardo Alde, Jr' }, { name: 'Corazon Alde' }];

function Timeline() {
  return (
    <section className="border-divider flex items-center justify-center border-b py-8">
      <h3 className="font-playfair-display mr-8 px-0 text-center text-4xl font-bold italic sm:px-12 sm:text-2xl">
        Wedding <br />
        Timeline
      </h3>
      <div className="font-playfair grid w-fit grid-cols-1 gap-8 text-xl sm:w-full sm:grid-cols-3 lg:flex">
        {timeline.map(([time, event], i) => (
          <div key={i} className="flex grow flex-col items-center text-center">
            <p className="font-libre-baskerville font-bold">{time}</p>
            <p className="text-lg uppercase">{event}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Countdown({ isSm }: { isSm: boolean }) {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  // const [endDate] = useState(new Date(2026, 1, 5, 20, 51, 20));
  const [endDate] = useState(new Date(2026, 7, 29, 14));

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      if (now >= endDate) {
        setYear(0);
        setMonth(0);
        setDay(0);
        setHour(0);
        setMinute(0);
        setSecond(0);
        return;
      }

      let years = endDate.getFullYear() - now.getFullYear();
      let months = endDate.getMonth() - now.getMonth();
      let days = endDate.getDate() - now.getDate();
      let hours = endDate.getHours() - now.getHours();
      let minutes = endDate.getMinutes() - now.getMinutes();
      let seconds = endDate.getSeconds() - now.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes -= 1;
      }
      if (minutes < 0) {
        minutes += 60;
        hours -= 1;
      }
      if (hours < 0) {
        hours += 24;
        days -= 1;
      }
      if (days < 0) {
        const previousMonth = (now.getMonth() - 1 + 12) % 12;
        const daysInPreviousMonth = getDaysInMonth(new Date(now.getFullYear(), previousMonth));
        days += daysInPreviousMonth;
        months -= 1;
      }
      if (months < 0) {
        months += 12;
        years -= 1;
      }

      setYear(years);
      setMonth(months);
      setDay(days);
      setHour(hours);
      setMinute(minutes);
      setSecond(seconds);
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="border-divider flex items-center border-b py-8">
      <div className="flex w-full flex-col gap-4">
        <h3 className="font-playfair-display px-12 text-center text-3xl font-bold italic sm:px-0">Days until Forever</h3>
        <div className="grid w-full grid-cols-5 items-center justify-center gap-2 sm:flex sm:gap-12">
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold sm:text-4xl">{month}</p>
            <p className="font-playfair text-sm uppercase sm:text-base">{!isSm ? 'Months' : 'Mth'}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold sm:text-4xl">{day}</p>
            <p className="font-playfair text-sm uppercase sm:text-base">{!isSm ? 'Days' : 'Day'}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold sm:text-4xl">{hour}</p>
            <p className="font-playfair text-sm uppercase sm:text-base">{!isSm ? 'Hours' : 'Hr'}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold sm:text-4xl">{minute}</p>
            <p className="font-playfair text-sm uppercase sm:text-base">{!isSm ? 'Minutes' : 'Min'}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold sm:text-4xl">{second}</p>
            <p className="font-playfair text-sm uppercase sm:text-base">{!isSm ? 'Seconds' : 'Sec'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  // hooks
  const { id: guestId } = useParams();
  const { guest: guestQuery, loading } = useGuest(guestId!);
  const { isSm, isMd } = useWidthCheck();

  // local states
  const [guests, setGuests] = useAtom(guestAtom);

  useEffect(() => {
    if (guestQuery != undefined) {
      setGuests(guestQuery);
    }
  }, [guestQuery]);

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
        <section className="border-divider flex flex-col border-y py-8 md:grid md:grid-cols-17">
          <div className="padding-4 col-span-12 flex flex-col pb-4 md:pr-4 md:pb-0">
            <div className="mb-10 flex flex-col items-start gap-4 lg:flex-row">
              <div className="text-items font-poppins w-full shrink grow-2 lg:w-1">
                <h3 className="font-libre-baskerville mb-5 text-3xl font-semibold text-black capitalize sm:text-4xl">
                  You're Cordially Invited To Share The Couple's Special Day
                </h3>
                <p>
                  Dear <span className="relative bg-yellow-200 font-bold text-black">{guests.nickname}</span>, the couple would love it if
                  you could make it to their wedding on <span className="font-bold text-black">August 29, 2026</span>
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
            <RSVP />
          </div>
          <div className="border-divider text-items font-poppins col-span-5 border-t pt-4 pl-0 md:border-t-0 md:border-l md:pt-0 md:pl-4">
            <div className="tg grid grid-cols-[2fr_3fr] gap-4 md:block">
              {isMd ? (
                <div className="aspect-3/2 bg-cover bg-center" style={{ backgroundImage: `url('${donBoscoImg}')` }} />
              ) : (
                <img src={donBoscoImg} />
              )}
              <div>
                <h3 className="font-libre-baskerville mb-1 text-2xl font-semibold text-black capitalize md:mt-5">Ceremony Venue</h3>
                <p>Don Bosco Chapel Makati</p>
                <a href="https://maps.app.goo.gl/6waU4P1bzqK6kfMy5">
                  <p className="text-sm text-blue-900 underline">Google Maps Link</p>
                </a>
              </div>
            </div>
            <div className="tg mt-8 grid grid-cols-[2fr_3fr] gap-4 md:block">
              {isSm ? (
                <div className="aspect-3/2 bg-cover bg-center" style={{ backgroundImage: `url('${arugaImg}')` }} />
              ) : (
                <img src={arugaImg} />
              )}
              <div>
                <h3 className="font-libre-baskerville mb-1 text-2xl font-semibold text-black capitalize md:mt-5">Ceremony Venue</h3>
                <p>Aruga Apartments by Rockwell</p>
                <a href="https://maps.app.goo.gl/cvjaYGtsLuF3TuXp6">
                  <p className="text-sm text-blue-900 underline">Google Maps Link</p>
                </a>
              </div>
            </div>
          </div>
        </section>
        <Countdown isSm={isSm} />
        <section className="border-divider border-b py-8">
          <WeddingParty />
        </section>
        <Timeline />
        <section className="border-divider flex flex-col border-b py-8 md:grid md:grid-cols-17">
          <div className="padding-4 col-span-12 flex flex-col pb-4 md:pr-4 md:pb-0">
            <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row">
              <div className="text-items font-poppins w-full shrink grow-2 sm:w-1">
                <h3 className="font-libre-baskerville text-4xl font-semibold text-black capitalize sm:text-5xl">Our Colors</h3>
                <p className="font-libre-baskerville mb-5 text-2xl italic">Olive Garden</p>
                <div className="-gap-5 flex">
                  <div className="-ml-4 aspect-square w-1/5 max-w-18 min-w-12 rounded-full border-5 border-white bg-[#818252] sm:w-1/6" />
                  <div className="-ml-4 aspect-square w-1/5 max-w-18 min-w-12 rounded-full border-5 border-white bg-[#575628] sm:w-1/6" />
                  <div className="-ml-4 aspect-square w-1/5 max-w-18 min-w-12 rounded-full border-5 border-white bg-[#5D4D36] sm:w-1/6" />
                  <div className="-ml-4 aspect-square w-1/5 max-w-18 min-w-12 rounded-full border-5 border-white bg-[#B8AD9B] sm:w-1/6" />
                  <div className="-ml-4 aspect-square w-1/5 max-w-18 min-w-12 rounded-full border-5 border-white bg-[#E3D3BC] sm:w-1/6" />
                </div>
                <p className="mt-6 text-lg font-semibold">Earth-inspired greens and browns </p>
                <p>simple, natural, and full of warmth.</p>
              </div>

              <div className="flex aspect-5/2 h-full w-full grow-3 flex-row justify-stretch sm:aspect-4/3 sm:w-1">
                <div
                  className="h-full w-1 grow-2 bg-cover bg-center transition-all duration-350 ease-in-out hover:grow-3"
                  style={{ backgroundImage: `url('${brownImg}')` }}
                />
                <div
                  className="h-full w-1 grow-2 bg-cover bg-center transition-all duration-350 ease-in-out hover:grow-3"
                  style={{ backgroundImage: `url('${greenImg}')` }}
                />
                <div
                  className="h-full w-1 grow-2 bg-cover bg-center transition-all duration-350 ease-in-out hover:grow-3"
                  style={{ backgroundImage: `url('${mushroomImg}')` }}
                />
              </div>
            </div>
            <div className="border-divider mb-10 flex flex-col items-start gap-4 border-t pt-10 sm:flex-row">
              <div className="text-items font-poppins w-full shrink grow-2 sm:w-1">
                <h3 className="font-libre-baskerville text-4xl font-semibold text-black capitalize sm:text-5xl">Attire</h3>
                <p className="font-libre-baskerville mb-5 text-2xl italic">Clothing Guide</p>
                <h4 className="mt-6 text-lg font-semibold">Ladies</h4>
                <p>Knee to Floor length Dress</p>
                <h4 className="mt-6 text-lg font-semibold">Gentelemen</h4>
                <p>Barong Tagalog</p>
              </div>

              <div className="mt-4 flex w-full grow-3 flex-col justify-stretch sm:mt-0 sm:w-1">
                <img src={attireSamples} className="w-full rounded-xl" />
                <p className="font-poppins text-items px-2 text-right text-xs">For inspiration only</p>
              </div>
            </div>

            <div className="border-divider flex flex-col items-start gap-4 border-t pt-10 lg:flex-row">
              <div className="text-items font-poppins w-full shrink grow-2 lg:w-1">
                <h3 className="font-libre-baskerville mb-12 flex flex-col justify-center text-center text-5xl/11 font-extrabold text-black capitalize sm:mb-5">
                  The
                  <br />
                  <span className="">Journey</span>
                  <br />
                  <span className="flex flex-row justify-center gap-2">
                    <span className="font-alex-brush font-normal lowercase">of</span>Us
                  </span>
                </h3>
                <div className="flex flex-col gap-4">
                  <p>
                    It began with curiosity. While talking with his friend, John heard a name he never heard before: “Jaynifer”. That
                    curiosity grew into a connection.
                  </p>
                  <p>
                    A movie date watching “The Good Dinosaur” marked the start of their relationship (A good date, a bad movie..) They grew
                    through school and chose to graduate in the same year. They had their share of challenges and arguments early on, but
                    over time, they learned and grew together.
                  </p>
                  <p>
                    One day, a little curious and teasing, Jayni asked John when he was going to 'pop the question'. John was planning to do
                    it on their first trip abroad, but with no tickets yet booked, he panicked and said "Before 30", accidentally not
                    specifying if he meant his 30th or her 30th. That ambiguity was answered on May 4, 2025, 1 day before John turned 30
                    when he finally propsed to Jayni in Singapore. And now after ten years, they continue life side by side. From everyday
                    moments to adventures near and far, they keep choosing each other with laughter, creativity, and trust.
                  </p>
                </div>
              </div>
              <img src={storyOfUsImg} className="w-full shrink grow-3 lg:w-1" />
            </div>
          </div>
          <div className="border-divider text-items font-poppins col-span-5 border-t pt-4 pl-0 md:border-t-0 md:border-l md:pt-0 md:pl-4">
            <div className="mx-2 mb-10 flex flex-col gap-4 bg-gray-100 p-6">
              <h3 className="font-libre-baskerville text-center text-4xl font-semibold text-black capitalize italic">Gift Guide</h3>
              <p>
                Your presence at our celebration is the greatest gift we could ask for. Should you wish to honor us further, a monetary gift
                would be warmly appreciated, though never expected.
              </p>
              <div className="mt-4 flex flex-col items-center gap-2">
                <h4 className="text-center text-3xl font-bold">BPI</h4>
                <img className="w-4/5" src={honeymoonFund} />
              </div>
            </div>
            <div className="border-divider mb-10 border-t pt-10">
              <img src={luunaMilo} className="w-full" />
              <h3 className="font-libre-baskerville mt-5 mb-1 text-3xl font-semibold text-black capitalize italic">
                Celebrating from Home
              </h3>
              <p>
                <span className="italic">Woof!</span> We’re so excited to see our favorite humans get married today! We can’t wait to be
                part of your adventures and share all the cuddles, belly rubs and wagging tails with you. Congratulations and lots of puppy
                love!
              </p>
            </div>
            <div className="border-divider border-t pt-10">
              <div className="border">
                <div className="bg-black p-4 text-white">
                  <h3 className="font-libre-baskerville text-center text-3xl font-semibold capitalize italic">Guest Awards</h3>
                </div>
                <div className="flex flex-col p-4 text-center">
                  <p>Longest Distance Travelled</p>
                  <p>First to RSVP</p>
                  <p>Last Guest to Stay</p>
                  <p>Most Photos Taken</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="font-poppins text-items px-5 py-8 text-xs sm:px-4">
        <p>
          <span className="font-semibold">© 2026</span> John Vicencio. All Rights Reserved
        </p>
      </footer>
    </div>
  );
}

export default App;
