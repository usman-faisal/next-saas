import React from 'react';
import { UserForm } from 'types/interfaces';

interface FormCardProps {
  data: UserForm;
}

const FormCard: React.FC<FormCardProps> = ({ data }) => {
  return (
    <div className="mx-auto w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div className="justify-between space-y-6 rounded-lg bg-gray-50 p-6 shadow-md dark:bg-navy-700 sm:flex-row">
        <div className="flex-1 sm:w-1/4">
          <h3 className=" text-lg font-bold">Institution</h3>
          <p>{data.institution}</p>
        </div>
        <div className="flex-1 sm:w-1/4">
          <h3 className=" text-lg font-bold">Location</h3>
          <p>{data.location}</p>
        </div>
        <div className="flex-1 sm:w-1/4">
          <h3 className=" text-lg font-bold">Specialty</h3>
          <p>{data.specialty}</p>
        </div>
        <div className="flex-1 sm:w-1/4">
          <h3 className=" text-lg font-bold">Year of Education</h3>
          <p>{data.year}</p>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
