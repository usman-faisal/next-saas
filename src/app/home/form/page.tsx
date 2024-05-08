'use client';

import { useEffect, useRef, useState } from 'react';

// COMPONENTS
import Card from 'components/card';

// ICONS
import FormModal from 'components/modal/FormModal';
import FormCard from 'components/card/FormCard';
import { createForm } from 'supabase/dbFunctions';
import { UserForm } from 'types/interfaces';
import useAuthStore from 'store/authStore';
import useFormStore from 'store/formStore';

const Clients = () => {
  const authStore = useAuthStore();
  const formStore = useFormStore();
  const [forms, setForms] = useState([]);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const onFormSubmit = async (formData: UserForm) => {
    const user = authStore.user;
    const { error, data } = await createForm(formData, user);
    formStore.addForm(data[0]);
    if (error) {
      alert('Failed to submit form');
    }
    setOpen(false);
  };
  useEffect(() => {
    const fetchForms = async () => {
      if (formStore.userForms.length === 0) {
        const forms = await formStore.getForms(authStore.user.id);
        setForms(forms);
      } else setForms(formStore.userForms);
    };
    fetchForms();
  }, []);
  useEffect(() => {
    if (formStore.userForms?.length > 0) setForms(formStore.userForms);
  }, [formStore.userForms]);

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
        {forms.map((form, i) => (
          <FormCard data={form} key={i} />
        ))}
      </Card>
      <FormModal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        onFormSubmit={onFormSubmit}
      />
    </div>
  );
};

export default Clients;
