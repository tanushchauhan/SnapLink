"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

async function onLaunch(urlID, setLoading, router) {
  const res = await fetch("/api/checkurl", {
    method: "POST",
    body: JSON.stringify({
      data: {
        urlID,
      },
    }),
  });
  const data = await res.json();
  if (!data.success) {
    setLoading("e");
  } else if (data.url !== "not found") {
    router.push(data.url);
  } else {
    setLoading(urlID);
  }
}

function Page(e) {
  const [loading, setLoading] = useState("l");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const urlID = e.target.floating_id.value;
    let url = e.target.url.value;

    const res = await fetch("/api/addurl", {
      method: "POST",
      body: JSON.stringify({
        data: {
          urlID,
          url,
        },
      }),
    });

    const data = await res.json();

    if (!data.success) {
      if (
        data.error.message ===
          'duplicate key value violates unique constraint "urls_urlID_key"' &&
        data.error.code === "23505"
      ) {
        toast.error(`Error: ID already exists! Please choose another ID.`);
        e.target.floating_id.value = "";
      } else {
        toast.error(`Error: ${data.error.message}`);
      }
    } else {
      toast.success("Successfully created!");
      router.push("/");
    }
  }

  useEffect(() => {
    onLaunch(e.params.id, setLoading, router);
  }, [e.params.id, router]);
  return (
    <div>
      {loading === "l" && (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col gap-10 items-center justify-center m-10">
            <div className="text-3xl text-center">
              Thanks for using SnapLink
            </div>
            <Image
              src="/logo.png"
              width={600}
              height={600}
              alt="SnapLink Logo"
              priority
            />
            <div className="flex gap-4 items-center justify-center">
              <svg
                aria-hidden="true"
                className=" w-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <div className="text-xl text-center">Please wait loading...</div>
            </div>
          </div>
        </div>
      )}
      {loading !== "l" && (
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center mt-16 mx-8 w-full md:max-w-lg mb-28">
            <div className="flex gap-10 items-center justify-center flex-col w-full">
              <Image
                src="/logo.png"
                width={600}
                height={600}
                alt="SnapLink Logo"
                priority
              />
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-8">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="floating_id"
                      id="floating_id"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={loading}
                      onChange={() => {
                        toast(
                          "Please go to homepage to add ID of your choice!",
                          {
                            icon: "⚠️",
                          }
                        );
                      }}
                      required
                    />
                    <label
                      htmlFor="floating_id"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter in the ID
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <label
                      htmlFor="url"
                      className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      Enter in the URL
                    </label>
                    <input
                      id="url"
                      type="url"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="eg. https://..."
                      autoFocus
                      required
                    ></input>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-8"
                >
                  Submit
                </button>
              </form>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  router.push("/");
                }}
              >
                Go Back to Homepage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
