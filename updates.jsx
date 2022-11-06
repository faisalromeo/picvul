import Image from "next/image";
import { useState, useEffect } from "react";
import UpdatesData from "../../db/updates.json";
import Link from "next/link";
import Follow from "../../db/follow.json";

export default function Updates() {
  const [HideUpdates, setHideUpdates] = useState(false);
  const displayCard = [
    "flex justify-center",
    "hidden lg:block",
    "hidden xl:block",
    "hidden 2xl:block",
    "hidden md:block",
  ];
  return (
    <>
      <button
        className={`mb-5 bg-blue-400 font-semibold text-white py-1 px-3 rounded-xl hover:bg-blue-500 hover:motion-safe:duration-500 hover:shadow-lg ${
          HideUpdates ? "block" : "hidden"
        }`}
        onClick={() => {
          setHideUpdates(false);
        }}
      >
        Show Updates
      </button>
      <div
        className={`font-semibold mb-10 ${HideUpdates ? "hidden" : "block"}`}
      >
        <div className="flex justify-between">
          <h1>People Updates</h1>
          <a
            className="font-normal cursor-pointer"
            onClick={() => {
              setHideUpdates(true);
            }}
          >
            Hide
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-3">
          {UpdatesData.data.map((e) => (
            <div key={e.index} className={`${displayCard[e.index]}`}>
              {e.index == 4 ? (
                <div className="absolute z-20 translate-x-20 h-32 w-52 flex justify-center items-center bg-gradient-to-r from-transparent to-white">
                  <a className="bg-white px-4 py-1 rounded-full text-gray-600 cursor-pointer">
                    see more
                  </a>
                </div>
              ) : (
                ""
              )}
              <UpdatesCard
                username={e.username}
                fullname={e.fullname}
                profile_img={e.profil_img}
                post1={e.post_img[0]}
                post2={e.post_img[1]}
                post3={e.post_img[2]}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const UpdatesCard = ({
  username,
  fullname,
  profile_img,
  post1,
  post2,
  post3,
}) => {
  const [Following, setFollowing] = useState(false);
  const [Followers, setFollowers] = useState(false);
  const [FollowState, setFollowState] = useState(null);

  useEffect(() => {
    setFollowState(Follow.followings.some((e) => e.username === username));
  }, []);

  return (
    <div className="content pt-2 max-w-max scale-up-hor-left">
      <div className="absolute translate-y-2 h-16 w-16 overflow-hidden border-2 border-white rounded-full z-10">
        <Link href={`/${username}`}>
          <a>
            <Image
              src={profile_img}
              alt={`${username}_profile`}
              height={100}
              width={100}
              blurDataURL="/cdn/webassets/loading.webp"
              placeholder="blur"
              layout="responsive"
              className="object-cover"
            />
          </a>
        </Link>
      </div>
      <div className="flex gap-1 pl-8 mb-2">
        <div className="h-20 w-20 rounded-md overflow-hidden">
          <Link href={`/${username}/${post1.id}`}>
            <a>
              <Image
                src={post1.cdn_img}
                alt={`${username}_post1`}
                height={100}
                width={100}
                blurDataURL="/cdn/webassets/loading.webp"
                placeholder="blur"
                layout="responsive"
                className="object-cover"
              />
            </a>
          </Link>
        </div>
        <div className="h-20 w-20 rounded-md overflow-hidden">
          <Link href={`/${username}/${post2.id}`}>
            <a>
              <Image
                src={post2.cdn_img}
                alt={`${username}_post2`}
                height={100}
                width={100}
                blurDataURL="/cdn/webassets/loading.webp"
                placeholder="blur"
                layout="responsive"
                className="object-cover"
              />
            </a>
          </Link>
        </div>
        <div className="h-20 w-20 rounded-md overflow-hidden">
          <Link href={`/${username}/${post3.id}`}>
            <a>
              <Image
                src={post3.cdn_img}
                alt={`${username}_post3`}
                height={100}
                width={100}
                blurDataURL="/cdn/webassets/loading.webp"
                placeholder="blur"
                layout="responsive"
                className="object-cover"
              />
            </a>
          </Link>
        </div>
      </div>
      <div className="flex justify-between pl-8 text-sm">
        <Link href={`/${username}`}>
          <a>{fullname}</a>
        </Link>
        {FollowState ? (
          <div className="flex flex-col items-end">
            <a
              className="text-gray-400 cursor-pointer"
              onClick={() => {
                setFollowing(Following ? false : true);
              }}
            >
              Following
            </a>
            <div
              className={`${
                Following ? "flex" : "hidden"
              } absolute translate-y-6 rounded-lg border p-2 bg-white flex-col gap-1 items-center`}
            >
              <span>Unfollow ?</span>
              <div className="flex gap-2">
                <button
                  className="py-1 px-4 rounded-full bg-gray-200 font-semibold"
                  onClick={() => {
                    setFollowState(false);
                    setFollowers(false);
                    setFollowing(false);
                  }}
                >
                  Yes
                </button>
                <button
                  className="py-1 px-4 rounded-full bg-red-200 font-semibold"
                  onClick={() => {
                    setFollowing(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-end">
            <a
              className="text-blue-500 cursor-pointer"
              onClick={() => {
                setFollowers(Followers ? false : true);
              }}
            >
              Follow
            </a>
            <div
              className={`${
                Followers ? "flex" : "hidden"
              } absolute translate-y-6 rounded-lg border p-2 bg-white flex-col gap-1 items-center`}
            >
              <span>Follow ?</span>
              <div className="flex gap-2">
                <button
                  className="py-1 px-4 rounded-full bg-gray-200 font-semibold"
                  onClick={() => {
                    setFollowState(true);
                    setFollowers(false);
                    setFollowing(false);
                  }}
                >
                  Yes
                </button>
                <button
                  className="py-1 px-4 rounded-full bg-red-200 font-semibold"
                  onClick={() => {
                    setFollowers(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
