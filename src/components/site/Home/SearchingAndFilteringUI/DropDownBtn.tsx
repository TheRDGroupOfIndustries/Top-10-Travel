import React from "react";

interface Props {
  title: string;
  // arr:[string]
}

function DropDownBtn({ title }: Props) {
  return (
    <div className="dropdown dropdown-hover m-auto bg-white text-black">
      <div
        tabIndex={0}
        role="button"
        className="btn rounded-full m-1 bg-white hover:border-black shadow-none border-transparent text-black hover:text-white"
      >
        {title}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box z-[1] w-52 p-2 bg-white border-2"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
}

export default DropDownBtn;
