import React, { useCallback, useMemo, useState } from 'react'
import { findPrime } from '../utils/helper';

const Demo = () => {

    const [text, setText] = useState(0);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    // const prime = findPrime(text);

    //* Memoising the Heavy Operation
    const prime = useMemo(() => findPrime(text), [text]);

    return (
        <div className={
            "w-full min-h-full p-6 " + (isDarkTheme && "bg-gray-900 text-white")
        }
        >
            <div>
                <button
                    className={"px-4 py-2 bg-slate-200 " + (isDarkTheme && "bg-slate-400 text-black")}
                    onClick={() => setIsDarkTheme(!isDarkTheme)}
                >
                    Toggle
                </button>
            </div>

            <div>
                <input
                    className={"border px-4 py-1 mt-6 border-black w-72 outline-none " + (isDarkTheme && "bg-slate-200 text-black")}
                    type="number"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            <div>
                <h1 className="mt-4 font-bold text-xl">nth Prime : {prime}</h1>
            </div>
        </div>
    )
}

export default Demo