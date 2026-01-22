import { ChangeEvent, MouseEvent, useState } from 'react';
import { Link, Meta, useNavigate } from 'react-router-dom';

import { showOverlayAtom } from '@/features/dashboard/store/store';
import { useAddGuest } from '@/features/dashboard/hooks/useAddGuest';
import { Guest } from '@/features/dashboard/types';

import monogram from '/images/monogram.svg';
import { auth } from '@/lib/firebase/auth';
import { useAtom } from 'jotai';
import { useGuests } from '@/features/dashboard/hooks/useGuests';
import { Link as LinkIcon } from 'lucide-react';

function AddGuestOverlay() {
  // hooks
  const addGuest = useAddGuest();

  // local states
  const [_, setOverlay] = useAtom(showOverlayAtom);
  const [nickname, setNickname] = useState<string>('');
  const [guestNames, setGuestNames] = useState<string[]>(['']);
  const [error, setError] = useState<Set<number>>(new Set());

  // ---------------------------
  // Event Handlers
  // ---------------------------

  const removeError = (i: number) => {
    const nextError = new Set(error);
    nextError.delete(i);

    setError(nextError);
  };

  const handleOverlayClicked = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleAddGuestClicked = () => {
    const nextGuestNames = [...guestNames];
    nextGuestNames.push('');

    setGuestNames(nextGuestNames);
  };

  const handleRemoveClicked = (i: number) => () => {
    const nextGuestNames = [...guestNames];
    nextGuestNames.splice(i, 1);
    setGuestNames(nextGuestNames);
  };

  const handleNicknameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setNickname(val);

    if (error.has(-1)) removeError(-1);
  };

  const handleNameChanged = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    const nextGuestName = [...guestNames];
    nextGuestName[i] = val;
    if (error.has(i)) removeError(i);

    setGuestNames(nextGuestName);
  };

  const handleDoneClicked = async () => {
    const nextError = new Set<number>();

    // Check for Errors
    guestNames.forEach((name, i) => {
      if (name == '') nextError.add(i);
    });

    if (guestNames.length > 1 && nickname == '') nextError.add(-1);

    if (nextError.size > 0) {
      setError(nextError);
      return;
    }

    // Submit Guests
    await addGuest({
      nickname,
      names: guestNames,
    });
    setOverlay(false);
  };

  return (
    <div onClick={handleOverlayClicked} className="text-items flex w-100 flex-col gap-8 rounded-xl bg-gray-100 p-6">
      <h2 className="text-xl font-bold">Add Guest</h2>
      <div className="flex flex-col">
        <div className="border-divider mb-8 flex w-full flex-col gap-1 border-b pb-8">
          <label htmlFor="nickname" className="ml-1 text-sm">
            Nicknames
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={handleNicknameChanged}
            placeholder="Guests Nicknames"
            className="border-divider grow rounded-sm border bg-white px-2 py-1"
          />
        </div>
        <div className="mb-4 flex items-end justify-between">
          <h3 className="font-semibold">Guest Info</h3>
          <p className="cursor-pointer text-sm underline" onClick={handleAddGuestClicked}>
            Add Guest
          </p>
        </div>
        <div>
          {guestNames.map((name, i) => (
            <div key={i} className="flex w-full flex-col gap-1 not-first:mt-2">
              <div className="flex justify-between px-1 text-sm">
                <label htmlFor="guest">Name</label>
                {guestNames.length > 1 && (
                  <p className="cursor-pointer underline" onClick={handleRemoveClicked(i)}>
                    Remove
                  </p>
                )}
              </div>
              <input
                id="guest"
                type="text"
                value={name}
                onChange={handleNameChanged(i)}
                placeholder="Name"
                className={`${error.has(i) && 'error'} border-divider grow rounded-sm border bg-white px-2 py-1 [.error]:border-red-400`}
              />
            </div>
          ))}
        </div>
      </div>
      <input
        type="button"
        value="Add"
        className="cursor-pointer self-end rounded-full bg-black px-8 py-1 text-white"
        onClick={handleDoneClicked}
      />
    </div>
  );
}

function Overlay() {
  const [_, setOverlay] = useAtom(showOverlayAtom);

  const handleOverlayClicked = () => {
    setOverlay(false);
  };

  return (
    <div className="absolute inset-0 z-1 flex items-center justify-center bg-black/40" onClick={handleOverlayClicked}>
      <AddGuestOverlay />
    </div>
  );
}

function Dashboard() {
  // hooks
  const nav = useNavigate();

  // local states
  const [overlay, setOverlay] = useAtom(showOverlayAtom);
  const { guests } = useGuests();

  // -------------------------------
  // Event Handlers
  // -------------------------------

  const handleSigneoutClicked = () => {
    auth.signOut();
    nav('/dashboard/login');
  };

  const handleAddGuestClicked = () => {
    setOverlay(true);
  };

  const handleGuestClicked = (id: string) => async () => {
    const url = `${window.location.origin}${location.pathname}`;
    const guestUrl = `${url}#/?id=${id}`;
    console.log(guestUrl);
    await navigator.clipboard.writeText(guestUrl);
  };

  return (
    <>
      {overlay && <Overlay />}
      <div className="font-playfair text-items min-h-dvh w-full">
        <div className="mx-auto flex min-h-dvh w-full max-w-280 items-stretch">
          <div className="border-divider grow border-x pt-12">
            <div className="flex items-end justify-between px-8">
              <h1 className="text-4xl font-extrabold text-black">Guest List</h1>
              <input
                onClick={handleAddGuestClicked}
                type="button"
                value="Add Guest"
                className="font-poppins border-divider cursor-pointer rounded-full border px-4 py-1"
              />
            </div>
            <div className="border-divider font-poppins mt-8 grid w-full grid-cols-3 border-y px-3 py-1 text-base font-semibold">
              <h3>Nickname</h3>
              <h3>Guest Names</h3>
            </div>
            <div className="font-poppins grid w-full cursor-pointer grid-cols-3 px-3 py-4 font-light">
              {guests.map(([id, guest]) => (
                <div
                  key={id}
                  className="group border-divider/50 col-span-3 grid grid-cols-3 border-b py-2"
                  onClick={handleGuestClicked(id)}
                >
                  <p>{guest.nickname}</p>
                  <p>{guest.names.map((name, i) => `${name}${guest.names.length > 1 && i < guest.names.length - 1 ? ', ' : ''}`)}</p>
                  <div className="flex items-center justify-end">
                    <LinkIcon className="h-4 w-4 not-group-hover:hidden" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="mt-24 flex w-60 flex-col items-center px-6">
            <Link to="/" className="cursor-pointer">
              <img src={monogram} className="aspect-square w-14" />
            </Link>
            <h2 className="font-playfair-display mt-4 text-2xl font-extrabold text-black">John & Jayni</h2>
            <p className="font-poppins">admin dashboard</p>
            <input
              onClick={handleSigneoutClicked}
              type="button"
              className="border-divider mt-4 w-full cursor-pointer rounded-full border px-3 py-1"
              value="Sign Out"
            />
          </aside>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
