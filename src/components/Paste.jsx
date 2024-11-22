import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { LuCopy } from 'react-icons/lu';
import { FaShareSquare } from 'react-icons/fa';

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Check if mobile
  const dispatch = useDispatch();
  const ref = useRef(null);

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Update mobile state on resize
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(paste) {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: window.location.href,
        })
        .then(() => {
          toast.success('Content shared successfully!');
        })
        .catch((error) => {
          toast.error('Error sharing content: ' + error);
        });
    } else {
      toast.error('Web Share API is not supported in your browser.');
    }
  }

  return (
    <div ref={ref} className="w-full min-h-screen p-4 text-white flex justify-center">
      <h1 className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[13vw] font-semibold leading-none tracking-tight text-zinc-700">Docs.</h1>

      <div className="w-full md:w-[85%]">
        <div className="searchbox flex justify-center">
          <input
            type="search"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 py-2 px-3 w-[80%] md:w-[50%] rounded-full bg-[#333333] focus:outline-none"
          />
        </div>

        <div className={`cardContainer flex ${isMobile ? 'flex-col' : 'flex-wrap'} w-full gap-4 justify-center md:justify-start`}>
          {filterData.length > 0 &&
            filterData.map((paste) => (
              <motion.div
                drag={!isMobile} // Disable dragging on mobile
                dragConstraints={ref}
                whileDrag={{ scale: 1.1 }}
                dragElastic={1}
                className={`card relative p-4 bg-[#3e3e3d] ${isMobile ? 'w-full h-[40vh]' : 'w-[18vw] h-[22vw]'} rounded-[2vw] overflow-hidden`}
                key={paste?._id}
              >
                <div className="font-semibold text-[4vw] md:text-base">{paste.title}</div>
                <div className="border border-[#777777] mt-2 mb-2"></div>
                <div className="mb-2 text-[3.5vw] md:text-sm">{paste.content}</div>

                <div className="footer absolute p-2 md:p-4 w-full bottom-0 left-0 bg-[#ff595e]">
                  <div className="flex justify-between gap-3 md:gap-5">
                    <button className="text-black text-[5vw] md:text-[2vw]">
                      <a href={`/?pasteId=${paste?._id}`}>
                        <CiEdit />
                      </a>
                    </button>

                    <button
                      onClick={() => handleDelete(paste?._id)}
                      className="text-black text-[4.5vw] md:text-[1.75vw]"
                    >
                      <MdDeleteOutline />
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success('Copied');
                      }}
                      className="text-black text-[4vw] md:text-[1.5vw]"
                    >
                      <LuCopy />
                    </button>

                    <button
                      onClick={() => handleShare(paste)}
                      className="text-black text-[4vw] md:text-[1.5vw]"
                    >
                      <FaShareSquare />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Paste;
