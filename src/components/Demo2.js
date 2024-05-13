import React, { useEffect, useRef, useState } from 'react'

const Demo2 = () => {

    let x = 10;
    const [y, setY] = useState(0);
    const ref = useRef(0);
    // console.log(ref); //* ref = {current = 0}

    const i = useRef(null);
    useEffect(() => {
        if (i.current) return;
        i.current = setInterval(() => {
            console.log("Namaste React", Math.random());
        }, 1000);

        return () => clearInterval(i.current);
    }, []);

    return (
        <div className='border-l px-6 border-slate-500 w-9/12 mx-6 my-4'>

            {/* Normal Variable  */}
            <div className='flex gap-4 justify-between items-center'>
                <button
                    className="px-4 py-2 bg-slate-200 "
                    onClick={() => {
                        x = x + 1;
                        console.log("x = " + x);
                    }}
                >
                    Increase x
                </button>
                <span className="font-bold text-xl">Let = {x}</span>
            </div>

            {/* State Variable  */}
            <div className='flex gap-4 justify-between items-center mt-6'>
                <button
                    className="px-4 py-2 bg-slate-200 "
                    onClick={() => {
                        setY(y + 1);
                    }}
                >
                    Increase State Y
                </button>
                <span className="font-bold text-xl">State = {y}</span>
            </div>

            {/* Ref variable  */}
            <div className='flex gap-4 justify-between items-center mt-6'>
                <button
                    className="px-4 py-2 bg-slate-200 "
                    onClick={() => {
                        ref.current = ref.current + 1;
                        console.log("ref = ", ref.current);
                    }}
                >
                    Increase Ref
                </button>
                <span className="font-bold text-xl">Ref = {ref.current}</span>
            </div>

            <button
                className="bg-red-900 p-4 m-4 text-white font-bold rounded-lg"
                onClick={() => {
                    clearInterval(i.current);
                }}
            >
                Stop Printing
            </button>

        </div>
    )
}

export default Demo2