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
              Ricky
              <br className="block sm:hidden" /> Cano
            </p>
            <p className="odd:text-right even:text-left">
              Ayeen
              <br className="block sm:hidden" /> Vicencio
            </p>
            <p className="odd:text-right even:text-left">
              Eduardo
              <br className="block sm:hidden" /> Alde, Jr
            </p>
            <p className="odd:text-right even:text-left">
              Ma. Cristina
              <br className="block sm:hidden" /> Aguas
            </p>
            <p className="odd:text-right even:text-left">
              John
              <br className="block sm:hidden" /> Fernandez
            </p>
            <p className="odd:text-right even:text-left">
              Filipina
              <br className="block sm:hidden" /> Sagana
            </p>
            <p className="odd:text-right even:text-left">
              Alfredo
              <br className="block sm:hidden" /> Reyes
            </p>
            <p className="odd:text-right even:text-left">
              Paz <br className="block sm:hidden" />
              Nama
            </p>
            <p className="odd:text-right even:text-left">
              Abelardo
              <br className="block sm:hidden" /> Pagsibigay, Jr.
            </p>
            <p className="odd:text-right even:text-left">
              Carolyn
              <br className="block sm:hidden" /> Chin
            </p>
          </div>
          <div className="col-span-1 text-right">
            <h4 className="text-lg font-light uppercase sm:text-lg/relaxed">
              Best
              <br className="sm:hidden" /> Woman
            </h4>
            <p>Patricia Vicencio</p>
          </div>
          <div className="col-span-1 text-left">
            <h4 className="text-lg font-light uppercase sm:text-lg/relaxed">
              Man of
              <br className="sm:hidden" /> Honor
            </h4>
            <p>Jayms Sagana</p>
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
            <p>Marlon Demafeliz</p>
            <p>Barbie Olegario</p>
          </div>
          <div className="col-span-2">
            <h4 className="text-lg font-light uppercase sm:text-xl">Cord</h4>
            <p>Erik Ramos</p>
            <p>Renee Ramos</p>
          </div>
          <div className="col-span-2">
            <h4 className="text-lg font-light uppercase sm:text-xl">Candle</h4>
            <p>Julian Nepomuceno</p>
            <p>Sophia Nuñez</p>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-4 leading-tight sm:gap-x-8 sm:gap-y-0">
            <h4 className="-mb-4 text-right text-lg font-light uppercase sm:mb-0 sm:text-xl">Groomsmen</h4>
            <h4 className="-mb-4 text-left text-lg font-light uppercase sm:mb-0 sm:text-xl">Bridesmaids</h4>
            <p className="odd:text-right even:text-left">
              Marlon
              <br className="block sm:hidden" /> Demafeliz
            </p>
            <p className="odd:text-right even:text-left">
              Barbie
              <br className="block sm:hidden" /> Olegario
            </p>
            <p className="odd:text-right even:text-left">
              Julian
              <br className="block sm:hidden" /> Nepomuceno
            </p>
            <p className="odd:text-right even:text-left">
              Sophia
              <br className="block sm:hidden" /> Nuñez
            </p>
            <p className="odd:text-right even:text-left">
              Nestor
              <br className="block sm:hidden" /> Joble
            </p>
            <p className="odd:text-right even:text-left">
              Helen
              <br className="block sm:hidden" /> Grace Danseco
            </p>
            <p className="odd:text-right even:text-left">
              Erik
              <br className="block sm:hidden" /> Ramos
            </p>
            <p className="odd:text-right even:text-left">
              Renee
              <br className="block sm:hidden" /> Ramos
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
            <p>Eli Reyes</p>
          </div>
          <div className="col-span-1 text-center">
            <h4 className="text-lg font-light uppercase sm:text-xl">Flower Girls</h4>
            <p>Bridgette Sagana</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeddingParty;
