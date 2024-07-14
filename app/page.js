"use client";

import Image from "next/image";
import toast from "react-hot-toast";

function Page() {
  async function handleSubmit(e) {
    e.preventDefault();
    const urlID = e.target.floating_id.value;
    const url = e.target.url.value;

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
      toast.error(`Error: ${data.error}`);
    } else {
      toast.success("Successfully created!");
      e.target.floating_id.value = "";
      e.target.url.value = "";
    }
  }
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center mt-16 mx-8 w-full md:max-w-lg mb-28">
        <div className="flex gap-10 items-center justify-center flex-col w-full">
          <Image
            src="/placeholder.png"
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
                <textarea
                  id="url"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="eg. https://..."
                  required
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
