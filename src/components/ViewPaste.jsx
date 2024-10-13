import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ViewPaste() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((p) => p._id === id);

  return (
    <div className="w-full flex flex-col items-center p-4">
      <div className="w-full md:w-[80%] lg:w-[70%]">
        <div className="flex gap-3 py-5 items-center justify-between">
          <input
            className="w-full  py-2 px-3 mb-4 border bg-[#0f0f0f] border-[#333333] rounded-full shadow-sm focus:outline-none focus:border-[#212529] text-white"
            type="text"
            placeholder="Enter title here"
            value={paste?.title}
            disabled
          />
        </div>

        {/* Browser-like button header */}
        <div className="bg-[#333333] w-full h-10 md:h-[3vw] rounded-t-lg flex gap-2 md:gap-1 px-4 py-2 items-center">
          <div className="w-3 h-3 md:w-[1.2vw] md:h-[1.2vw] bg-[#fd5754] rounded-full"></div>
          <div className="w-3 h-3 md:w-[1.2vw] md:h-[1.2vw] bg-[#febb40] rounded-full"></div>
          <div className="w-3 h-3 md:w-[1.2vw] md:h-[1.2vw] bg-[#33c848] rounded-full"></div>
        </div>

        {/* Content area */}
        <textarea
          className="w-full p-3 min-h-[40vh] md:min-h-[25vw] md:max-h-[25vw] mb-4 bg-[#0f0f0f] border-[3px] border-[#333333] border-t-0 focus:outline-none focus:ring-0 rounded-b-lg text-white"
          value={paste?.content}
          placeholder="Enter content here"
          disabled
        />
      </div>
    </div>
  );
}

export default ViewPaste;
