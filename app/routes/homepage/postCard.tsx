export default function PostCard() {
  return (
    <div className="bg-custom-postcard-white flex items-center px-6 rounded-xl py-4 shadow-lg">
      <img
        src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
        alt="profile"
        width="42"
        height="42"
        className="rounded-full mr-4"
      />
      <div className="flex p-2 bg-slate-100 rounded-3xl text-base px-4 w-full text-gray-500">
        <p>
          How's <span className="bg-bold text-gray-600 font-bold"> YOUR </span>{" "}
          day Lasallian Achiever?
        </p>
      </div>
    </div>
  );
}
