"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const PromptCard = ({ post, handleTagClick, handleDelete }) => {

  const { data: session } = useSession();
  const sessionUserId = session?.user?.id;
  const pathname = usePathname();
  const router = useRouter();

  const [ copied, setCopied ] = useState("");
  const [isPopUp, setIsPopUp] = useState(false)

  const hanldeCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handlePop = () => {
    setIsPopUp(!isPopUp)
    console.log("first")
    
  }


  return (
    <>
      <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={post.creator?.image}
              alt="user image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />

            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post.creator?.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator?.email}
              </p>
            </div>
          </div>

          <div className="copy_btn flex flex-row-reverse gap-3">
            <Image
              src={
                copied === post.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              width={18}
              height={18}
              alt="copy button icon"
              onClick={hanldeCopy}
              className=" cursor-pointer"
            />
            {sessionUserId === post.creator._id && (
              <Link href={`/update-prompt/${post._id}`}>
                <Image
                  src={"/assets/icons/edit.svg"}
                  width={18}
                  height={18}
                  alt="copy button icon"
                  className=" cursor-pointer"
                />
              </Link>
            )}
          </div>
        </div>
        <p
          onClick={handlePop}
          className="my-4 font-satoshi text-sm text-gray-700 cursor-pointer"
        >
          {post.prompt.length > 380
            ? post.prompt.slice(0, 120) + "..."
            : post.prompt}
        </p>
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>

        {/* {session?.user.id === post.creator._id && pathname === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p className="font-inter text-sm green_gradient cursor-pointer">
              Edit
            </p>

            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )} */}
      </div>

      {/* <div className={`${!isPopUp ? "hidden" : "inline-block"} `}>
        hello
      </div> */}
    </>
  );
}

export default PromptCard