import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useAtom } from 'jotai';
import { Guest, GuestRSVP } from '@/features/dashboard/types';
import { useUpdateGuest } from '@/features/guests/hooks/useSetGuest';
import { guestAtom } from '@/store/store';
import toast from 'react-hot-toast';

import { CircleAlert, LoaderCircle } from 'lucide-react';

import rsvpRImg from '/images/RSVP-R.png';

function RSVP() {
  // hooks
  const { id: guestId } = useParams();
  const { updateGuest, submitting } = useUpdateGuest(guestId!);

  // local states
  const [guests, setGuests] = useAtom(guestAtom);
  const [replies, setReply] = useState<GuestRSVP>({});
  const [error, setError] = useState(false);

  // computed states
  const hasSubmitted = guests.repliedAt != undefined;
  const canResubmit: boolean = useMemo(
    () => hasSubmitted && Object.keys(guests.invitees).some((key) => guests.invitees[key] != replies[key]),
    [guests, replies],
  );

  useEffect(() => {
    const nextReply = Object.entries(guests.invitees).reduce((acc: GuestRSVP, [name, reply]) => {
      acc[name] = reply;
      return acc;
    }, {});
    setReply(nextReply);
  }, [guests]);

  const handleRsvpClicked = (name: string, val: boolean) => () => {
    const nextReply = { ...replies };
    nextReply[name] = val;

    setReply(nextReply);
  };

  const handleSubmitClicked = async () => {
    const valid = !Object.values(replies).some((val) => typeof val != 'boolean');

    if (!valid) {
      toast.error('Please make sure all RSVPs are filled');
      setError(true);
      console.log(valid);
      return;
    }

    const nextGuests: Guest = { ...guests, invitees: replies, repliedAt: new Date().getTime() };
    await updateGuest(nextGuests);
    setError(false);
    setGuests(nextGuests);
  };

  return (
    <div className="border-divider flex w-full flex-col items-start justify-stretch gap-4 border-t p-8 px-0 pt-12 sm:px-8 lg:flex-row">
      <div
        className="font-poppins text-rsvp relative w-full border border-[#E8E3E3] bg-[#F5F0F0] bg-contain p-6 pt-14 sm:p-16"
        style={{
          backgroundImage: `url('${rsvpRImg}')`,
          backgroundPosition: 'top right',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '200px',
        }}
      >
        <h3 className="font-libre-baskerville mb-5 text-7xl font-semibold capitalize">RSVP</h3>
        <h4 className="font-playfair -mt-6 mb-16">Please kindly reply by July 29</h4>
        <div>
          <form className="flex flex-col items-center">
            {Object.entries(guests.invitees).map(([name, reply], i) => (
              <div key={i} className="w-full not-first:mt-8">
                <div className="border-items flex items-end border-b">
                  <p className="font-bold">M</p>
                  <p className="font-alex-brush grow text-center text-3xl sm:text-4xl">{name}</p>
                </div>
                <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-8">
                  <label htmlFor={`rsvp-${i}-y`} className="flex w-4/5 cursor-pointer items-center gap-2 sm:w-full">
                    <input
                      id={`rsvp-${i}-y`}
                      className="peer hidden"
                      type="radio"
                      name={`rsvp-${i}`}
                      value="yes"
                      onChange={handleRsvpClicked(name, true)}
                      checked={replies[name] == true}
                    />
                    <div className="aspect-square h-4 w-4 rounded-full border p-0.5">
                      {replies[name] == true && <div className="aspect-square h-full w-full rounded-full bg-black" />}
                    </div>
                    <p>Accepts Gladly</p>
                  </label>
                  <label htmlFor={`rsvp-${i}-n`} className="flex w-4/5 cursor-pointer items-center gap-2 sm:w-full">
                    <input
                      id={`rsvp-${i}-n`}
                      className="peer hidden"
                      type="radio"
                      name={`rsvp-${i}`}
                      value="no"
                      onChange={handleRsvpClicked(name, false)}
                      checked={replies[name] == false}
                    />
                    <div className="aspect-square h-4 w-4 rounded-full border p-0.5">
                      {replies[name] == false && <div className="aspect-square h-full w-full rounded-full bg-black" />}
                    </div>
                    <p>Decline Regretfully</p>
                  </label>
                </div>
              </div>
            ))}
            <div
              className={`${submitting && 'submitting'} mt-6 flex h-25 flex-col items-center justify-end gap-2 [.submitting]:justify-center`}
            >
              {submitting ? (
                <LoaderCircle className="animate-spin" />
              ) : hasSubmitted ? (
                <>
                  <AnimatePresence>
                    {canResubmit && (
                      <motion.input
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        type="button"
                        value="Update Reply"
                        className={`w-fit cursor-pointer border p-4 py-2`}
                        onClick={handleSubmitClicked}
                      />
                    )}
                  </AnimatePresence>
                  <motion.div initial={{ translateY: 50, opacity: 0 }} animate={{ translateY: 0, opacity: 1 }} className="h-6">
                    <p className="text-sm text-stone-500">
                      Replied @ <span className="font-semibold">{format(new Date(guests.repliedAt!), 'Pp')}</span>
                    </p>
                  </motion.div>
                </>
              ) : (
                <>
                  <input type="button" value="Send Reply" className="w-fit cursor-pointer border p-4 py-2" onClick={handleSubmitClicked} />
                  <div className="h-6 text-red-700">
                    <div className={`${error && 'error'} hidden gap-2 [.error]:flex`}>
                      <CircleAlert className="stroke-[1.2px]" />
                      Please make sure all items are filled
                    </div>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RSVP;
