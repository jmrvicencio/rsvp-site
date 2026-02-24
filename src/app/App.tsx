import { useState, useRef, RefObject } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDaysInMonth } from 'date-fns';
import { useAtom } from 'jotai';
import { useGuest } from '@/features/guests/hooks/useGuest';
import { guestAtom, showMobileMenuAtom } from '@/store/store';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import { AnimatePresence, motion } from 'motion/react';

import RSVP from './routes/Invite/RSVP';
import WeddingParty from './routes/Invite/WeddingParty';

import { Quote, Menu } from 'lucide-react';
import coupleImg from '/portfolio/banner.jpg';
import ceremonyImg from '/portfolio/ceremony.jpg';
import receptionImg from '/portfolio/reception.jpg';
import storyOfUsImg from '/portfolio/journey.jpg';
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
  const [endDate] = useState(new Date(2030, 1, 1, 12));

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

function MobileMenu({
  rsvpRef,
  venueRef,
  colorsRef,
  attireRef,
  giftRef,
  onNavClicked: handleNavClicked,
}: {
  rsvpRef: RefObject<HTMLDivElement | null>;
  venueRef: RefObject<HTMLDivElement | null>;
  colorsRef: RefObject<HTMLDivElement | null>;
  attireRef: RefObject<HTMLDivElement | null>;
  giftRef: RefObject<HTMLDivElement | null>;
  onNavClicked: (ref: RefObject<HTMLDivElement | null>) => () => void;
}) {
  const [showMobileMenu, setShowMobileMenu] = useAtom(showMobileMenuAtom);

  const handleMenuClicked = () => {
    setShowMobileMenu(false);
  };

  return (
    <motion.div
      initial={{ translateX: '100%' }}
      exit={{ translateX: '100%' }}
      animate={{ translateX: 0 }}
      transition={{
        type: 'tween',
        ease: 'easeOut',
        duration: 0.25,
      }}
      className="absolute inset-0 z-1 bg-gray-200/30 backdrop-blur-xl"
      onClick={handleMenuClicked}
    >
      <div className="font-poppins flex h-dvh w-full flex-col items-center justify-center gap-8 text-3xl font-bold">
        <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black" onClick={handleNavClicked(rsvpRef)}>
          RSVP
        </a>
        <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black" onClick={handleNavClicked(venueRef)}>
          Venue
        </a>
        <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black" onClick={handleNavClicked(colorsRef)}>
          Colors
        </a>
        <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black" onClick={handleNavClicked(attireRef)}>
          Attire
        </a>
        <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black" onClick={handleNavClicked(giftRef)}>
          Gift Guide
        </a>
      </div>
    </motion.div>
  );
}

function App() {
  // hooks
  const { id: guestId } = useParams();
  const { guest: guestQuery, loading } = useGuest(guestId!);
  const { isSm, isMd } = useWidthCheck();

  const rsvpRef = useRef<HTMLDivElement>(null);
  const venueRef = useRef<HTMLDivElement>(null);
  const colorsRef = useRef<HTMLDivElement>(null);
  const attireRef = useRef<HTMLDivElement>(null);
  const giftRef = useRef<HTMLDivElement>(null);

  // local states
  const [guests, setGuests] = useAtom(guestAtom);
  const [showMobileMenu, setShowMobileMenu] = useAtom(showMobileMenuAtom);

  useLockBodyScroll(showMobileMenu);

  useEffect(() => {
    if (guestQuery != undefined) {
      setGuests(guestQuery);
    }
  }, [guestQuery]);

  // ----------------
  // Event Listener
  // ----------------

  const handleNavClicked = (target: RefObject<HTMLDivElement | null>) => () => {
    target.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleMenuClicked = () => {
    setShowMobileMenu(true);
  };

  return (
    <div className="font-libre-baskerville relative mx-auto w-full max-w-350 px-0 sm:px-10 lg:px-18">
      <AnimatePresence>
        {showMobileMenu && (
          <MobileMenu
            rsvpRef={rsvpRef}
            venueRef={venueRef}
            colorsRef={colorsRef}
            attireRef={attireRef}
            giftRef={giftRef}
            onNavClicked={handleNavClicked}
          />
        )}
      </AnimatePresence>
      <header className="border-divider flex w-full flex-col items-stretch border-b pt-3 pb-0 sm:border-black sm:pt-10 sm:pb-0 after:sm:mt-2 after:sm:mb-1 after:sm:w-full after:sm:border-b">
        <h3 className="font-poppins mb-4 text-center text-black/60 uppercase not-sm:hidden">John Doe - Jane Doe</h3>
        <div className="relative">
          <div className="@container relative flex w-full items-center select-none lg:absolute">
            <div className="mx-auto w-fit">
              <h1 className="font-chomsky w-fit text-3xl sm:text-4xl lg:text-6xl">The Proposal Post</h1>
            </div>
            {isSm && (
              <div
                onClick={handleMenuClicked}
                className="border-divider absolute right-2 flex aspect-square h-8 w-8 items-center justify-center rounded-md border"
              >
                <Menu />
              </div>
            )}
          </div>
          <div>
            <div className="font-poppins bg-divider/10 text-items border-divider mt-3 flex w-full justify-between border-t px-4 py-3 text-xs font-light sm:hidden sm:text-base lg:mt-0 lg:flex lg:border-t-0 lg:bg-transparent lg:px-0 lg:pt-1 lg:pb-0">
              <div className="flex flex-col gap-1">
                <p>Saturday, January 1, 20xx</p>
                <p className="not-lg:hidden">RSVP Now</p>
              </div>
              <div>
                <p>Colletorto Parish Chapel, Italy</p>
              </div>
            </div>
            <div className="font-poppins mt-6 flex w-full justify-center gap-12 text-lg font-light not-sm:hidden">
              <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black" onClick={handleNavClicked(rsvpRef)}>
                RSVP
              </a>
              <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black" onClick={handleNavClicked(venueRef)}>
                Venue
              </a>
              <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black" onClick={handleNavClicked(colorsRef)}>
                Colors
              </a>
              <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black" onClick={handleNavClicked(attireRef)}>
                Attire
              </a>
              <a className="border-b-2 border-black/0 py-2 hover:cursor-pointer hover:border-black" onClick={handleNavClicked(giftRef)}>
                Gift Guide
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="@container px-4 sm:px-0">
        <h1 className="font-playfair-display my-8 text-center text-[clamp(1rem,10cqw,200rem)] font-bold sm:text-[clamp(1rem,6cqw,200rem)]">
          John & Jane <br className="sm:hidden" /> Getting Married!
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
                  you could make it to their wedding on <span className="font-bold text-black">January 1, 20xx</span>
                </p>
                <div className="border-divider my-5 border-l pl-4">
                  <Quote className="w-4 stroke-black/40" />
                  <p>I don't think we'd be able stop crying if they couldn't make it</p>
                </div>
                <p>The couple was quoted saying.</p>
              </div>
              <img src={coupleImg} className="w-full shrink grow-3 lg:w-1" />
            </div>
            <RSVP ref={rsvpRef} />
          </div>
          <div
            ref={venueRef}
            className="border-divider text-items font-poppins col-span-5 border-t py-16 pl-0 md:border-t-0 md:border-l md:py-0 md:pl-4"
          >
            <div className="tg grid grid-cols-[2fr_3fr] gap-4 md:block">
              {isMd ? (
                <div className="aspect-3/2 bg-cover bg-center" style={{ backgroundImage: `url('${ceremonyImg}')` }} />
              ) : (
                <img src={ceremonyImg} />
              )}
              <div>
                <h3 className="font-libre-baskerville mb-1 text-2xl font-semibold text-black capitalize md:mt-5">Ceremony Venue</h3>
                <p>Colletorto Parish Chapel, Italy</p>
                <a href="#">
                  <p className="text-sm text-blue-900 underline">Google Maps Link</p>
                </a>
              </div>
            </div>
            <div className="tg mt-8 grid grid-cols-[2fr_3fr] gap-4 md:block">
              {isSm ? (
                <div className="aspect-3/2 bg-cover bg-center" style={{ backgroundImage: `url('${receptionImg}')` }} />
              ) : (
                <img src={receptionImg} />
              )}
              <div>
                <h3 className="font-libre-baskerville mb-1 text-2xl font-semibold text-black capitalize md:mt-5">Ceremony Venue</h3>
                <p>Langerwehe Hotel, Germany</p>
                <a href="#">
                  <p className="text-sm text-blue-900 underline">Google Maps Link</p>
                </a>
              </div>
            </div>
          </div>
        </section>
        <Countdown isSm={isSm} />
        <section className="border-divider border-b py-16 md:py-8">
          <WeddingParty />
        </section>
        <Timeline />
        <section className="border-divider flex flex-col border-b py-8 md:grid md:grid-cols-17">
          <div className="padding-4 col-span-12 flex flex-col pb-4 md:pr-4 md:pb-0">
            <div ref={colorsRef} className="mb-10 flex flex-col items-start gap-4 py-16 sm:flex-row md:py-0">
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
            <div
              ref={attireRef}
              className="border-divider mb-10 flex flex-col items-start gap-4 border-t py-16 pt-16 sm:flex-row md:py-0 md:pt-10"
            >
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
                    This is placeholder text meant to demonstrate how a “Story of Us” section could look on a wedding invite–style portfolio
                    project. Imagine this as a sample narrative where two people meet by chance, discover shared interests, and begin
                    building a life together. The tone is intentionally heartfelt and personal, designed to show how copy can capture
                    emotion in a way that fits a themed design.
                  </p>
                  <p>
                    As the story unfolds, the placeholder text illustrates how everyday moments—like traveling, laughing together, or
                    supporting one another—can be written as milestones in a relationship. This isn’t a real couple’s journey, but rather an
                    example of how you might structure content to feel authentic and engaging. It demonstrates pacing, flow, and the kind of
                    language that works well for a wedding invite site.
                  </p>
                  <p>
                    Finally, the placeholder text concludes with a forward-looking sentiment: a symbolic “next chapter” that represents
                    commitment and celebration. Again, this is not an actual announcement, but a sample ending crafted to show how a
                    portfolio project could present a wedding invite narrative. It’s here to help visualize design, typography, and layout
                    choices without needing real personal details.
                  </p>
                </div>
              </div>
              <img src={storyOfUsImg} className="w-full shrink grow-3 lg:w-1" />
            </div>
          </div>
          <div className="border-divider text-items font-poppins col-span-5 border-t pt-4 pl-0 md:border-t-0 md:border-l md:pt-0 md:pl-4">
            <div ref={giftRef} className="mx-2 mb-10 flex flex-col gap-4 bg-gray-100 p-6">
              <h3 className="font-libre-baskerville text-center text-4xl font-semibold text-black capitalize italic">Gift Guide</h3>
              <p>
                Your presence at our celebration is the greatest gift we could ask for. Should you wish to honor us further, a monetary gift
                would be warmly appreciated, though never expected.
              </p>
              <div className="mt-4 flex flex-col items-center gap-2"></div>
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
                  <p>Last Man Standing</p>
                  <p>Longest Married</p>
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
