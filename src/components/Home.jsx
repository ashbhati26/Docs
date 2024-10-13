import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'; 
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

function Home() {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteId, allPastes]);

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updateToPastes(paste));
        } else {
            dispatch(addToPastes(paste));
        }
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className="w-full flex flex-col items-center p-4">
            <div className="w-full max-w-4xl">
                <div className='flex flex-col md:flex-row gap-3 py-5 items-center justify-between'>
                    <input
                        className="w-full md:w-[70%] py-2 px-3 mb-4 border bg-[#0f0f0f] border-[#333333] rounded-full shadow-sm focus:outline-none focus:border-[#212529] text-white"
                        type="text"
                        placeholder="Enter title here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        onClick={createPaste}
                        className="w-full md:w-[30%] bg-[#ea7a53] text-black mb-4 font-medium py-3 px-2 rounded-full hover:bg-[#ad5b40] transition-colors"
                    >
                        {pasteId ? "Update Paste" : "Create My Doc"}
                    </button>
                </div>

                <div className='bg-[#333333] w-full h-10 rounded-t-lg flex gap-1 px-4 py-2 items-center'>
                    <div className='w-4 h-4 bg-[#fd5754] rounded-full'></div>
                    <div className='w-4 h-4 bg-[#febb40] rounded-full'></div>
                    <div className='w-4 h-4 bg-[#33c848] rounded-full'></div>
                </div>
                <textarea
                    className="w-full p-2 min-h-[50vh] max-h-[50vh] mb-4 bg-[#0f0f0f] border-[3px] border-[#333333] border-t-0 focus:outline-none focus:ring-0 rounded-b-lg text-white"
                    value={value}
                    placeholder="Enter content here"
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    );
}

export default Home;
