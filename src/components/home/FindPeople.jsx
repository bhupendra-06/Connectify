import React from "react";

const people = [
  {
    profileImage:
      "https://media.istockphoto.com/id/864516870/photo/young-woman-photographing-the-autumn-season.jpg?s=612x612&w=0&k=20&c=M3G2SwKJ15zolsSaFABsneLitdWXCrrJ3LkTEKnIOys=",
    name: "Bhupendra Nirmalkar",
    name: "RajKumar Dewangan",
    time: "1 month ago",
  },
  {
    name: "Bhupendra Nirmalkar",
    time: "2 days ago",
  },
  {
    profileImage:
      "https://media.istockphoto.com/id/864516870/photo/young-woman-photographing-the-autumn-season.jpg?s=612x612&w=0&k=20&c=M3G2SwKJ15zolsSaFABsneLitdWXCrrJ3LkTEKnIOys=",
    name: "Bhupendra Nirmalkar",
    name: "Deepak Sahu",
    time: "2 weeks ago",
  },
  {
    profileImage:
      "https://media.istockphoto.com/id/864516870/photo/young-woman-photographing-the-autumn-season.jpg?s=612x612&w=0&k=20&c=M3G2SwKJ15zolsSaFABsneLitdWXCrrJ3LkTEKnIOys=",
    name: "Bhupendra Nirmalkar",
    name: "RajKumar Dewangan",
    time: "1 month ago",
  },
  {
    name: "Bhupendra Nirmalkar",
    time: "2 days ago",
  },
  {
    profileImage:
      "https://media.istockphoto.com/id/864516870/photo/young-woman-photographing-the-autumn-season.jpg?s=612x612&w=0&k=20&c=M3G2SwKJ15zolsSaFABsneLitdWXCrrJ3LkTEKnIOys=",
    name: "Bhupendra Nirmalkar",
    name: "Deepak Sahu",
    time: "2 weeks ago",
  }
];

const noUser =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3W3oppN7sdVCsUWwwnPIn9pX6E6G2UW70w&s";

// MAIN COMPONENT STARTS HERE
const FindPeople = () => {
  return (
    <>
    <div className="find-people mt-5 pb-2 border rounded-lg shadow-lg">
      <div className="mt-5 w-[380px] h- rounded-t-lg">
        <div className="p-5 flex justify-between text-lg font-semibold  border-b">
          <h2 className="text-gray-800">Find People</h2>
          <a href="#" className="text-blue-600">
            See all
          </a>
        </div>
      </div>
      {people.map((person, index) => {
        return <PersonCard person={person} index={index} />;
      })}
    </div>
    <div className="my-friends mt-5 pb-2 border rounded-lg shadow-lg">
      <div className="mt-5 w-[380px] h- rounded-t-lg">
        <div className="p-5 flex justify-between text-lg font-semibold  border-b">
          <h2 className="text-gray-800">My Friends</h2>
          <a href="#" className="text-blue-600">
            See all
          </a>
        </div>
      </div>
      {people.map((person, index) => {
        return <PersonCard person={person} index={index} />;
      })}
    </div>

    </>
  );
};

export default FindPeople;

const PersonCard = ({ person, index }) => {
  return (
    <li className="profile mx-2 my-5 px-2 flex items-center justify-between">
      <div>
        <div className="flex items-center justify-center">
          <img
            className="w-14 h-14 object-cover rounded-full"
            src={person.profileImage || noUser}
          />
          <div className="text-start ml-2">
            <h3 className="text-base text-gray-800 font-bold">
              {person.name || "Anonymous"}
              <span className="text-sm text-gray-400 block">
                {person.time || "new account.."}
              </span>
            </h3>
          </div>
        </div>
      </div>

      <button className="m-l2 px-5 py-2 rounded-full border-2 border-blue-500 bg-blue-500 text-white text-sm font-bold duration-200">
        Follow
      </button>
    </li>
  );
};
