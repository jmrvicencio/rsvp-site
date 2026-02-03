import { ChangeEvent, MouseEvent, useState, useRef, useEffect } from 'react';
import { Link, Meta, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import _ from 'lodash';

import { showOverlayAtom } from '@/features/dashboard/store/store';
import { useAddGuest } from '@/features/dashboard/hooks/useAddGuest';
import { Guest, GuestRSVP, SortType } from '@/features/dashboard/types';

import monogram from '/images/monogram.svg';
import { auth } from '@/lib/firebase/auth';
import { useAtom } from 'jotai';
import { useGuests } from '@/features/dashboard/hooks/useGuests';
import { Link as LinkIcon, ChevronsUpDown, ArrowDown, ArrowUp } from 'lucide-react';
import toast from 'react-hot-toast';

function AddGuestOverlay() {
  // Refs
  const nameInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // hooks
  const { addGuest, submitting } = useAddGuest();

  // local states
  const [_, setOverlay] = useAtom(showOverlayAtom);
  const [newGuest, setNewGuest] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [guestNames, setGuestNames] = useState<string[]>(['']);
  const [error, setError] = useState<Set<number>>(new Set());

  // ---------------------------
  // Effects
  // ---------------------------

  useEffect(() => {
    if (newGuest === false) return;
    console.log('focusing element');

    const i = guestNames.length - 1;
    nameInputRefs.current[i]?.focus();

    setNewGuest(false);
  }, [newGuest]);

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

  const handleAddGuestChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    const nextGuestName = [...guestNames];
    nextGuestName.push(val);

    setGuestNames(nextGuestName);
    setNewGuest(true);
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
    if (!submitting) {
      const nextNickname = nickname == '' ? guestNames[0] : nickname;
      await addGuest({
        nickname: nextNickname,
        invitees: guestNames.reduce((acc: GuestRSVP, name) => {
          acc[name] = null;
          return acc;
        }, {}),
      });
      setOverlay(false);
    }
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
                ref={(el) => {
                  nameInputRefs.current[i] = el;
                }}
                id="guest"
                type="text"
                value={name}
                onChange={handleNameChanged(i)}
                placeholder="Name"
                className={`${error.has(i) && 'error'} border-divider grow rounded-sm border bg-white px-2 py-1 [.error]:border-red-400`}
              />
            </div>
          ))}
          <div className="flex w-full flex-col gap-1 not-first:mt-2">
            <div className="flex h-5 justify-between px-1 text-sm">
              <label htmlFor="add-guests" className="text-items/40">
                Add More Guests...{' '}
              </label>
            </div>
            <input
              id="add-guests"
              type="text"
              onChange={handleAddGuestChanged}
              placeholder="Additional Guest"
              value=""
              className={`border-divider grow rounded-sm border bg-white px-2 py-1`}
            />
          </div>
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
    console.log('closing overlay');
    setOverlay(false);
  };

  return (
    <div className="absolute inset-0 z-1 flex items-center justify-center bg-black/40" onClick={handleOverlayClicked}>
      <AddGuestOverlay />
    </div>
  );
}

function SortArrow({ active = false, sortDirection }: { active?: boolean; sortDirection: 'asc' | 'desc' }) {
  const className = `${!active && 'inactive'} h-3 w-3 [.inactive]:stroke-slate-400 stroke-slate-800 stroke-[2.2px]`;

  return !active ? (
    <ChevronsUpDown {...{ className }} />
  ) : sortDirection == 'desc' ? (
    <ArrowDown {...{ className }} />
  ) : (
    <ArrowUp {...{ className }} />
  );
}

function Dashboard() {
  // hooks
  const nav = useNavigate();

  // local states
  const [overlay, setOverlay] = useAtom(showOverlayAtom);
  const { guests: guestsQuery } = useGuests();
  const [guests, setGuests] = useState([...guestsQuery]);
  const [sortType, setSortType] = useState<SortType>('nickname');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // -------------------------------
  // Effects
  // -------------------------------

  useEffect(() => {
    setGuests([...guestsQuery]);
  }, [guestsQuery]);

  useEffect(() => {
    console.log(guestsQuery);
    let nextGuests: [string, Guest][] = [];

    switch (sortType) {
      case 'nickname':
        nextGuests = _.orderBy(guestsQuery, ([_, guest]) => guest.nickname, [sortDirection]);
        setGuests(nextGuests);

        break;
      case 'repliedAt':
        nextGuests = _.orderBy(guestsQuery, [([_, guest]) => guest.repliedAt, ([_, guest]) => guest.nickname], [sortDirection, 'asc']);
        setGuests(nextGuests);

        break;
      case 'name':
        nextGuests = guestsQuery.reduce((acc: [string, Guest][], [id, guest]) => {
          Object.entries(guest.invitees).forEach(([name, reply]) => {
            acc.push([id, { ...guest, invitees: { [name]: reply } }]);
          });
          return acc;
        }, []);

        nextGuests = _.orderBy(
          nextGuests,
          [([_, guest]) => Object.keys(guest.invitees)[0], ([_, guest]) => guest.nickname],
          [sortDirection, 'asc'],
        );
        setGuests(nextGuests);

        break;
      case 'reply':
        nextGuests = guestsQuery.reduce((acc: [string, Guest][], [id, guest]) => {
          Object.entries(guest.invitees).forEach(([name, reply]) => {
            acc.push([id, { ...guest, invitees: { [name]: reply } }]);
          });
          return acc;
        }, []);

        nextGuests = _.orderBy(
          nextGuests,
          [([_, guest]) => Object.values(guest.invitees)[0], ([_, guest]) => guest.nickname],
          [sortDirection, 'asc'],
        );
        setGuests(nextGuests);
        break;
      default:
        break;
    }
  }, [sortType, sortDirection]);

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
    const guestUrl = `${url}#/${id}`;
    console.log(guestUrl);
    await navigator.clipboard.writeText(guestUrl);
    toast.success('Copied to clipboard');
  };

  const handleHeadingClicked = (val: SortType) => () => {
    setSortType(val);

    if (val == sortType) setSortDirection((prev) => (prev == 'asc' ? 'desc' : 'asc'));
  };

  return (
    <>
      {overlay && <Overlay />}
      <div className="font-poppins text-items min-h-dvh w-full bg-white">
        <div className="mx-auto flex min-h-dvh max-w-280 min-w-full items-stretch sm:min-w-0">
          <div className="border-divider min-w-200 grow border-x pt-12">
            <div className="flex items-end justify-between px-8">
              <h1 className="text-3xl font-medium text-black">Guest List</h1>
              <input
                onClick={handleAddGuestClicked}
                type="button"
                value="Add Guest"
                className="font-poppins border-divider cursor-pointer rounded-full border px-4 py-1"
              />
            </div>
            <div className="mx-4 mt-8 overflow-clip rounded-xl border border-slate-200 bg-white text-sm">
              <div className="font- poppins grid w-full grid-cols-(--dashboard-cols) gap-x-2 bg-slate-100 px-3 py-2">
                <h3 className="flex cursor-pointer items-center gap-2 select-none" onClick={handleHeadingClicked('nickname')}>
                  Nickname <SortArrow {...{ sortDirection, active: sortType == 'nickname' }} />
                </h3>
                <h3 className="flex cursor-pointer items-center gap-2 select-none" onClick={handleHeadingClicked('repliedAt')}>
                  Replied At <SortArrow {...{ sortDirection, active: sortType == 'repliedAt' }} />
                </h3>
                <h3 className="flex cursor-pointer items-center gap-2 select-none" onClick={handleHeadingClicked('name')}>
                  Guest Names <SortArrow {...{ sortDirection, active: sortType == 'name' }} />
                </h3>
                <h3 className="flex cursor-pointer items-center gap-2 select-none" onClick={handleHeadingClicked('reply')}>
                  Reply <SortArrow {...{ sortDirection, active: sortType == 'reply' }} />
                </h3>
                <h3 className="text-center">Link</h3>
              </div>
              <div className="font-poppins flex w-full flex-col font-light">
                {guests.map(([id, guest], i) => {
                  const guestLength = Object.keys(guests).length;

                  return (
                    <div key={id + i} className="group border-divider/50 grid grid-cols-(--dashboard-cols) gap-x-2 border-b px-3 py-2">
                      <p className="py-2 font-medium">{guest.nickname}</p>
                      <p className="py-2">{guest?.repliedAt ? format(new Date(guest.repliedAt), 'Pp') : ''}</p>
                      <div className="col-span-2 flex flex-col">
                        {Object.entries(guest.invitees).map(([name, reply], i) => (
                          <div
                            key={name + i}
                            className="border-divider/50 grid grid-cols-[2fr_1fr] items-center not-first:mt-2 not-first:border-t not-first:pt-2"
                          >
                            <p className="py-2">{name}</p>
                            <div
                              className={`${reply == undefined && 'pending'} divider flex w-fit items-center gap-1 rounded-sm border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-900 [.pending]:text-slate-500`}
                            >
                              <div
                                className={`${reply == undefined ? '' : reply == true ? 'accept' : 'decline'} aspect-square h-2 w-2 rounded-full bg-slate-300 [.accept]:bg-green-500 [.decline]:bg-red-500`}
                              />
                              {reply == undefined ? 'PENDING' : reply == true ? 'ACCEPT' : 'DECLINE'}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex cursor-pointer items-center justify-center" onClick={handleGuestClicked(id)}>
                        <LinkIcon className="aspect-square h-4 w-4 stroke-slate-500 stroke-2" />
                      </div>
                    </div>
                  );
                })}
              </div>
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
