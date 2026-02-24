import flourishR from '/images/flourish-r.svg';
import flourishL from '/images/flourish-l.svg';

function WeddingParty() {
  return (
    <div className="font-playfair border-rsvp mx-auto grid max-w-3xl border px-8 text-center text-2xl font-bold">
      <div className="border-divider border-b py-8">
        <div className="mb-10 flex w-full flex-row items-center justify-center gap-2">
          <img src={flourishL} />
          <div className="font-light">
            <h3 className="mb-2 text-2xl/6 uppercase sm:mb-0 sm:text-3xl">Primary Sponsors</h3>
            <p className="text-sm/3 sm:text-base/3">to stand witness to our vows</p>
          </div>
          <img src={flourishR} />
        </div>
        <div className="grid grid-flow-dense grid-cols-2 gap-x-4 gap-y-6 text-lg sm:gap-x-8 sm:text-2xl">
          <div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-4 leading-tight sm:gap-x-8 sm:gap-y-0">
            <h4 className="-mb-4 text-right text-lg font-light uppercase sm:mb-0 sm:text-xl">Ninongs</h4>
            <h4 className="-mb-4 text-left text-lg font-light uppercase sm:mb-0 sm:text-xl">Ninangs</h4>

            <p className="odd:text-right even:text-left">
              John
              <br className="block sm:hidden" /> Doe
            </p>
            <p className="odd:text-right even:text-left">
              Jane
              <br className="block sm:hidden" /> Deer
            </p>
            <p className="odd:text-right even:text-left">
              John
              <br className="block sm:hidden" /> Doe
            </p>
            <p className="odd:text-right even:text-left">
              Jane
              <br className="block sm:hidden" /> Deer
            </p>
            <p className="odd:text-right even:text-left">
              John
              <br className="block sm:hidden" /> Doe
            </p>
            <p className="odd:text-right even:text-left">
              Jane
              <br className="block sm:hidden" /> Deer
            </p>
            <p className="odd:text-right even:text-left">
              John
              <br className="block sm:hidden" /> Doe
            </p>
            <p className="odd:text-right even:text-left">
              Jane
              <br className="block sm:hidden" /> Deer
            </p>
            <p className="odd:text-right even:text-left">
              John
              <br className="block sm:hidden" /> Doe
            </p>
            <p className="odd:text-right even:text-left">
              Jane
              <br className="block sm:hidden" /> Deer
            </p>
          </div>
          <div className="col-span-1 text-right">
            <h4 className="text-lg font-light uppercase sm:text-lg/relaxed">
              Best
              <br className="sm:hidden" /> Woman
            </h4>
            <p>Jane Deer</p>
          </div>
          <div className="col-span-1 text-left">
            <h4 className="text-lg font-light uppercase sm:text-lg/relaxed">
              Man of
              <br className="sm:hidden" /> Honor
            </h4>
            <p>John Doe</p>
          </div>
        </div>
      </div>
      <div className="py-8">
        <div className="mb-10 flex w-full flex-row items-center justify-center gap-2">
          <img src={flourishL} />
          <div className="font-light">
            <h3 className="mb-2 text-2xl/6 uppercase sm:mb-0 sm:text-3xl">Secondary Sponsors</h3>
            <p className="text-sm/3 sm:text-base/3">to assist with our needs</p>
          </div>
          <img src={flourishR} />
        </div>
        <div className="grid grid-flow-dense grid-cols-2 gap-x-4 gap-y-6 text-lg sm:gap-x-8 sm:text-2xl">
          <div className="col-span-2">
            <h4 className="text-lg font-light uppercase sm:text-xl">Veil</h4>
            <p>John Doe</p>
            <p>Jane Deer</p>
          </div>
          <div className="col-span-2">
            <h4 className="text-lg font-light uppercase sm:text-xl">Cord</h4>
            <p>John Doe</p>
            <p>Jane Deer</p>
          </div>
          <div className="col-span-2">
            <h4 className="text-lg font-light uppercase sm:text-xl">Candle</h4>
            <p>John Doe</p>
            <p>Jane Deer</p>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-4 leading-tight sm:gap-x-8 sm:gap-y-0">
            <h4 className="-mb-4 text-right text-lg font-light uppercase sm:mb-0 sm:text-xl">Groomsmen</h4>
            <h4 className="-mb-4 text-left text-lg font-light uppercase sm:mb-0 sm:text-xl">Bridesmaids</h4>
            <p className="odd:text-right even:text-left">
              John
              <br className="block sm:hidden" /> Doe
            </p>
            <p className="odd:text-right even:text-left">
              Jane
              <br className="block sm:hidden" /> Deer
            </p>
            <p className="odd:text-right even:text-left">
              John
              <br className="block sm:hidden" /> Doe
            </p>
            <p className="odd:text-right even:text-left">
              Jane
              <br className="block sm:hidden" /> Deer
            </p>
            <p className="odd:text-right even:text-left">
              John
              <br className="block sm:hidden" /> Doe
            </p>
            <p className="odd:text-right even:text-left">
              Jane
              <br className="block sm:hidden" /> Deer
            </p>
            <p className="odd:text-right even:text-left">
              John
              <br className="block sm:hidden" /> Doe
            </p>
            <p className="odd:text-right even:text-left">
              Jane
              <br className="block sm:hidden" /> Deer
            </p>
          </div>
          <div className="col-span-1 text-center">
            <h4 className="text-lg font-light uppercase sm:text-xl">Coin Bearer</h4>
            <p>TBA</p>
          </div>
          <div className="col-span-1 text-center">
            <h4 className="text-lg font-light uppercase sm:text-xl">Bible Bearer</h4>
            <p>TBA</p>
          </div>
          <div className="col-span-1 text-center">
            <h4 className="text-lg font-light uppercase sm:text-xl">Ring Bearer</h4>
            <p>TBA</p>
          </div>
          <div className="col-span-1 text-center">
            <h4 className="text-lg font-light uppercase sm:text-xl">Flower Girls</h4>
            <p>Jane Deer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeddingParty;
