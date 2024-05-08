'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// COMPONENTS
import Card from 'components/card';

// ICONS
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import Filter from 'components/filter';
import { signupUser } from 'supabase/authFunctions';
import { redirect } from 'next/navigation';
import InputField from 'components/fields/InputField';
import FormModal from 'components/modal/FormModal';

const Clients = () => {
  const [forms, setForms] = useState([
    {
      institution: 'Test',
      location: 'Karaachi',
      specialty: 'Special',
      year: 2009,
    },
  ]);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  return (
    <div>
      <Card extra="mt-3 h-fit p-8 gap-6">
        <div className=" flex items-center justify-between ">
          <h3 className=" text-2xl font-semibold">Your Forms</h3>

          <button
            className="linear w-fit rounded-xl bg-bluePrimary px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            onClick={() => setOpen(true)}
          >
            Add New Form
          </button>
        </div>
        {/* Form Cards */}
        {/* <Card extra=" bg-[#] p-4 mt-4"></Card> */}
      </Card>
      <FormModal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
    </div>
  );
};

export default Clients;
