'use client'

import Image from "next/image";

const ProfileCard = ({user}) => {
  console.log(user)
  return (
    <section className="prompt_card">
      <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
        <Image
          src={user.image}
          alt="user image"
          width={40}
          height={40}
          className="rounded-full object-contain"
        />

        <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {user.username}
          </h3>
          <p className="font-inter text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
    </section>
  );
}

export default ProfileCard