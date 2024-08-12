import React from 'react';

const UserSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      clipRule="evenodd"
    />
  </svg>
);

const RobotSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
    {...props}
  >
    {/* Replace this placeholder path with the actual robot SVG path */}
    <path d="M12 2C10.897 2 10 2.897 10 4C10 5.103 10.897 6 12 6C13.103 6 14 5.103 14 4C14 2.897 13.103 2 12 2ZM12 8C10.343 8 9 9.343 9 11V14.828L7.707 16.121C7.316 16.512 7 17.016 7 17.586V19C7 19.553 7.447 20 8 20H16C16.553 20 17 19.553 17 19V17.586C17 17.016 16.684 16.512 16.293 16.121L15 14.828V11C15 9.343 13.657 8 12 8Z" />
  </svg>
);


const SendButton =(props)=>{
  
}

export { UserSvg, RobotSvg };
