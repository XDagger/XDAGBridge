import React from "react";
import { useState, useEffect, useRef } from "react";
import useTypewriter from "react-typewriter-hook";

const MagicOcean = [
    " convert tokens ",
    " from Ethereum ",
    " to XDAG",

];
let index = 0;

export default function TypeWriter() {
    const [magicName, setMagicName] = useState("convert tokens");
    const intervalRef = useRef({});
    const name = useTypewriter(magicName);
    useEffect(
        () => {
            intervalRef.current = setInterval(() => {
                index = index > 1 ? 0 : ++index;
                setMagicName(MagicOcean[index]);
            }, 4000);
            return function clear() {
                clearInterval(intervalRef.current);
            };
        },
        [magicName]
    );
    return (
        <div className="App">
            <span className="cursor">{name}</span>
        </div>
    );
}
