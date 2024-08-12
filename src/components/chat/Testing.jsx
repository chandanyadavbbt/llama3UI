import React, { useEffect, useState } from 'react';

function Testing() {
    const [chatmessage, setChatmessage] = useState({});

    useEffect(() => {
        async function dispMessage() {
            let resp = localStorage.getItem("ll");
            if (resp) {
                let result = JSON.parse(resp);
                setChatmessage(result);
            }
        }
        dispMessage();
    }, []);

    async function handlefetch() {
        try {
            const resp = await fetch("https://fakestoreapi.com/products/1");
            const result = await resp.json();
            localStorage.setItem("ll", JSON.stringify(result)); // Store as string
            setChatmessage(result); // Update state
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button onClick={handlefetch}>Click here</button>
            <p>{chatmessage.title ? chatmessage.title : 'No data available'}</p>
        </div>
    );
}

export default Testing;
