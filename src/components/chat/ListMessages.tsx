'use client';

import { useEffect, useRef, useState } from 'react';
import useAuthStore from 'store/authStore';
import useChatStore from 'store/chatStore';
import supabase from '../../supabase/supabaseClient';

export default function ListMessages() {
  const messages = useChatStore((state) => state.messages);
  const activeInbox = useChatStore((state) => state.activeInbox);
  const auth = useAuthStore();
  useEffect(() => {
    if (!activeInbox) return;
    let channel;
    (async () => {
      const user = await auth.getUser();
      console.log(user);
      const { data } = await supabase()
        .from('messages')
        .select('*')
        .eq('inbox', activeInbox)
        .order('created_at', { ascending: false });
      console.log(data);
      data && useChatStore.setState({ messages: data.reverse() });

      channel = supabase()
        .channel('chat-room')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages' },
          async (payload) => {
            console.log(payload, 'ljsdjlkfsdkljjklds');
            const { data } = await supabase()
              .from('messages')
              .select('*')
              .eq('inbox', activeInbox)
              .order('created_at', { ascending: false });

            data && useChatStore.setState({ messages: data.reverse() });
          },
        );
      channel.subscribe();
    })();
    return () => {
      channel?.unsubscribe();
    };
  }, [activeInbox]);
  if (!activeInbox)
    return (
      <div className="h-fit overflow-y-auto p-4 pb-36">
        <p
          className="text-center text-2xl text-gray-900
        "
        >
          Select a chat to start messaging
        </p>
      </div>
    );

  const SenderMessage = ({ message }: { message: string }) => {
    return (
      <div className="mb-4 flex cursor-pointer justify-end">
        <div className="flex max-w-96 gap-3 rounded-lg bg-indigo-500 p-3 text-white">
          <p>{message}</p>
        </div>
        <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full">
          <img
            src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
            alt="My Avatar"
            className="h-8 w-8 rounded-full"
          />
        </div>
      </div>
    );
  };

  const ReceiverMessage = ({ message }: { message: string }) => {
    return (
      <div className="mb-4 flex cursor-pointer">
        <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full">
          <img
            src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
            alt="User Avatar"
            className="h-8 w-8 rounded-full"
          />
        </div>
        <div className="flex max-w-96 gap-3 rounded-lg bg-white p-3">
          <p className="text-gray-700">{message}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-fit overflow-y-auto p-4 pb-36">
      {messages.map((message, index) => {
        if (message.sender === auth.user?.id) {
          return <SenderMessage key={index} message={message.content} />;
        } else {
          return <ReceiverMessage key={index} message={message.content} />;
        }
      })}
    </div>
  );
}
