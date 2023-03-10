"use client";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import { getAuthData } from "../auth";
import { useEffect, useState } from "react";
import Loading from "../loading";

import type { User, Set } from "../types";
import Navbar from "../navbar";

function ButtonToStudySet(props: { set: Set; key: string }) {
  const router = useRouter();

  const { id, title, description } = props.set;
  const author = props.set.expand.author;
  const termCount = props.set.cards.length;

  console.log(author);

  return (
    <button
      className="col-span-1 flex h-44 w-96 grow-0 flex-col rounded-md border border-gray-200 p-4 transition-all duration-300 hover:bg-offwhite hover:shadow"
      onClick={() => router.push(`/sets/${id}`)}
      key={props.key}
    >
      <h1 className="w-0 min-w-full truncate text-left text-xl font-semibold">
        {title}
      </h1>
      <h4 className="w-0 min-w-full truncate text-left text-sm font-medium text-gray-600">
        {termCount} {termCount === 1 ? "Term" : "Terms"}
      </h4>
      <div className="flex-grow" />
      <h3 className="w-0 min-w-full truncate text-left text-sm text-gray-600">
        {author.username}
      </h3>
    </button>
  );
}

function CreateStudySet() {
  const router = useRouter();

  return (
    <button
      className="col-span-1 flex h-44 w-96 grow-0 flex-col items-center justify-center rounded-md border border-gray-200 p-4 transition-all duration-300 hover:bg-offwhite hover:shadow"
      onClick={() => router.push(`/sets/create`)}
    >
      <h1 className="w-0 min-w-full truncate text-center text-xl font-semibold text-gray-500">
        Create a new set
      </h1>
    </button>
  );
}

function Page() {
  const router = useRouter();
  const pb = new PocketBase("https://quizzable.trevord.live");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null as User | null);

  useEffect(() => {
    const func = async function () {
      // check if the user is already logged in
      const user = pb.authStore;
      if (!user.isValid) {
        router.push("/login");
      } else {
        setLoading(false);
        console.log(user.model);
        const id = user.model?.id;
        if (!id) {
          console.error("No user id found");
          return;
        }
        setUserData(
          await pb.collection("users").getOne(user.model?.id, {
            expand: "favoriteSets,favoriteSets.author,sets,sets.author",
          })
        );
      }
    };
    func().catch(console.error);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!userData) {
    return <div className="min-h-screen w-full">User data not found</div>;
  }

  if (!userData.expand.favoriteSets) {
    userData.expand.favoriteSets = [];
  }

  if (!userData.expand.sets) {
    userData.expand.sets = [];
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-10 pb-10">
      <Navbar user={userData} />

      <section
        className="mx-auto flex max-w-4xl flex-col gap-5"
        id="favoritedSets"
      >
        <div className="m-5 grid w-[49.25rem] grid-cols-2 gap-5">
          <h1 className="col-span-2 text-left text-2xl">Favorited Sets</h1>
          {userData.expand.favoriteSets.map((set: Set) => {
            return <ButtonToStudySet set={set} key={set.id} />;
          })}
          {
            // if the user has no favorited sets, show a button to create a new set
            userData.expand.favoriteSets.length === 0 && (
              <div className="col-span-2 flex h-44 w-full items-center">
                <h1 className="text-md w-0 min-w-full select-none text-center font-normal text-gray-400">
                  You don't have any favorited sets yet.
                </h1>
              </div>
            )
          }
        </div>
      </section>

      <section className="grid max-w-4xl grid-cols-2 gap-5" id="mySets">
        <h1 className="col-span-2 text-left text-2xl">Your Sets</h1>
        <CreateStudySet />
        {/* filter out any published vs unpublished sets */}
        {userData.expand.sets
          .filter((set: Set) => set.published)
          .map((set: Set) => {
            return <ButtonToStudySet set={set} key={set.id} />;
          })}
      </section>

      {userData.expand.sets.filter((set: Set) => !set.published).length > 0 ? (
        <section
          className="mx-auto flex max-w-4xl flex-col gap-5"
          id="myDrafts"
        >
          <div className="m-5 grid w-[49.25rem] grid-cols-2 gap-5">
            <h1 className="col-span-2 text-left text-2xl">Your Drafts</h1>
            {userData.expand.sets
              .filter((set: Set) => !set.published)
              .map((set: Set) => {
                return <ButtonToStudySet set={set} key={set.id} />;
              })}
          </div>
        </section>
      ) : null}
    </main>
  );
}

export default Page;
