'use client';
import Card from 'components/card';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import useAuthStore from 'store/authStore';
import useChatStore from 'store/chatStore';
import useMatchStore from 'store/matchStore';
import { createInbox } from 'supabase/dbFunctions';
import { Match } from 'types/interfaces';

const Matches = () => {
  const matchStore = useMatchStore();
  const authStore = useAuthStore();
  const chatStore = useChatStore();
  const [matches, setMatches] = useState<Match[]>([]);
  useEffect(() => {
    matchStore.getMatches(authStore.user.id);
  }, []);
  useEffect(() => {
    setMatches(matchStore.matches);
  }, [matchStore.matches]);
  const onAccept = async (match: Match) => {
    await matchStore.deleteMatch(match.id);
    setMatches(matchStore.matches);
    const { data, error } = await createInbox({
      user1: match.user1.id,
      user2: match.user2.id,
    });
    chatStore.addInbox(data[0]);
    const newMatches = matches.filter((m) => m.id !== match.id);
    setMatches(newMatches);
    toast.success('User has been added to your inbox');
  };
  const onReject = async (matchId: number) => {
    await matchStore.deleteMatch(matchId);
    const newMatches = matches.filter((m) => m.id !== matchId);
    setMatches(newMatches);
    toast.success('User has been rejected');
  };
  const getMatchedUser = (match: Match) => {
    if (match.user1.id != authStore.user.id) return match.user1;
    if (match.user2.id != authStore.user.id) return match.user2;
  };
  console.log(matches, 'matches');
  return (
    <Card extra="mt-3 h-fit p-8 gap-6">
      <div className=" flex items-center justify-between ">
        <h3 className=" text-2xl font-semibold">
          Accept your matches to start chatting
        </h3>
      </div>
      <div className="mt-3">
        {matches.map((match, index) => (
          <div key={index} className="w-full rounded-xl bg-gray-100 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  {getMatchedUser(match)?.name || 'n/a'}
                </h2>
                <p className="mt-2 text-sm text-gray-800">
                  <strong>Fields matched: </strong>
                  {match.fields}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <FaCheck
                  onClick={() => onAccept(match)}
                  className="cursor-pointer text-xl transition-colors duration-300 hover:text-green-500"
                />
                <FaTimes
                  onClick={() => onReject(match.id)}
                  className="cursor-pointer text-xl transition-colors duration-300 hover:text-red-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
export default Matches;
