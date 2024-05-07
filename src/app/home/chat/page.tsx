'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// COMPONENTS
import Card from 'components/card';

// ICONS
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import Filter from 'components/filter';
import { getUser } from 'utils/auth';
import { Chat, Inbox } from 'types/interfaces';

const Clients = () => {
  const [isCountryFilter, setIsCountryFilter] = useState(false);
  const [isIndustryFilter, setIsIndustryOpen] = useState(false);
  const [isBusinessFilter, setIsBusinessOpen] = useState(false);
  const [inboxes, setInboxes] = useState<Inbox[]>([]);
  const [activeInbox, setActiveInbox] = useState<string>();
  const [chats, setChats] = useState<Chat[]>([]);
  const user = getUser();

  return (
    <Card extra="mt-3 flex h-[85vh] overflow-hidden">
      <div className="flex h-full overflow-hidden">
        <div className="w-1/4 border-r border-gray-300 bg-white">
          <header className="flex items-center justify-between border-b border-gray-300 bg-indigo-600 p-4 text-white">
            <h1 className="text-2xl font-semibold">Your Chats</h1>
          </header>

          <div className="mb-9 overflow-y-auto p-3 pb-20">
            {[1, 2, 3].map((inbox) => (
              <div className="mb-4 flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100">
                <div className="mr-3 h-12 w-12 rounded-full bg-gray-300">
                  <img
                    src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    alt="User Avatar"
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{'inbox.user.name'}</h2>
                  <p className="text-gray-600">{'inbox.lastMessage'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex-1">
          <header className="bg-white p-4 text-gray-700">
            <h1 className="text-2xl font-semibold">Alice</h1>
          </header>

          <div className="h-fit overflow-y-auto p-4 pb-36">
            {/* {chats.map} */}
            <div className="mb-4 flex cursor-pointer">
              <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full">
                <img
                  src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <div className="flex max-w-96 gap-3 rounded-lg bg-white p-3">
                <p className="text-gray-700">Hey Bob, how's it going?</p>
              </div>
            </div>

            <div className="mb-4 flex cursor-pointer justify-end">
              <div className="flex max-w-96 gap-3 rounded-lg bg-indigo-500 p-3 text-white">
                <p>
                  Hi Alice! I'm good, just finished a great book. How about you?
                </p>
              </div>
              <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full">
                <img
                  src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="My Avatar"
                  className="h-8 w-8 rounded-full"
                />
              </div>
            </div>
          </div>

          <footer className="absolute bottom-0 w-full border-t border-gray-300 bg-white p-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full rounded-md border border-gray-400 p-2 focus:border-blue-500 focus:outline-none"
              />
              <button className="ml-2 rounded-md bg-indigo-500 px-4 py-2 text-white">
                Send
              </button>
            </div>
          </footer>
        </div>
      </div>
    </Card>
  );
};

export default Clients;
