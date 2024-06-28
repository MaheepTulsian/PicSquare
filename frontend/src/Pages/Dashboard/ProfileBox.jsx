import React from 'react'

const ProfileBox = ({avatar, firstName, lastName}) => {
  return (
    <div className='w-full flex items-center justify-center'>
      <button id="btn-message" className="button-message">
        <div className="content-avatar">
          <div className="status-user"></div>
          <div className="avatar">
            <img className="user-img" src={avatar} />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center pl-2 text-left text-white">
          <div className="font-semibold flex items-center opacity-100 scale-y-100 transition-all duration-200 ease-out">{firstName} {lastName}</div>
        </div>
      </button>
    </div>
  )
}

export default ProfileBox
