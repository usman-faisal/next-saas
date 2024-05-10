'use client';

import { useEffect } from 'react';
import useAuthStore from 'store/authStore';
import useChatStore from 'store/chatStore';
import supabase from '../../supabase/supabaseClient';

export default function ListInbox() {
  const user = useAuthStore((state) => state.user);
  const inboxes = useChatStore((state) => state.inboxes);

  useEffect(() => {
    (async () => {
      const { data } = await supabase()
        .from('inbox')
        .select('id, created_at, user1 (id, name), user2 (id, name)')
        .or(`user1.eq.${user?.id},user2.eq.${user?.id}`);
      data &&
        data.length > 0 &&
        useChatStore.setState({ inboxes: data as any });
    })();
  }, []);

  function handleInboxClick(inboxId: number) {
    useChatStore.setState({ activeInbox: inboxId });
  }

  return (
    <div className="mb-9 overflow-y-auto p-3 pb-20">
      {inboxes.map((inbox) => (
        <div className="my-2 flex cursor-pointer items-center gap-3 rounded-md px-4 py-4 hover:bg-gray-100 bg-background-100 dark:bg-navy-800 dark:hover:bg-navy-900">
          <div className="mr-3 h-8 w-8 rounded-full bg-gray-300">
            <img
              src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="User Avatar"
              className="h-8 w-8 rounded-full"
            />
          </div>
          <button className="" onClick={() => handleInboxClick(inbox.id)}>
            <h2 className="text-lg font-semibold text-navy-700 dark:text-white">
              {inbox.user1.id === user?.id
                ? inbox.user2.name
                : inbox.user1.name}
            </h2>
          </button>
        </div>
      ))}
    </div>
  );
}
