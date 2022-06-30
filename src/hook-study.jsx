import React, {useState} from 'react';
import {useFetch, useInput, useTab} from "./hooks/customHooks";

const HookStudy = () => {

    const content = [
        {
            tab: "section1",
            content: "this is section 1"
        },
        {
            tab: "section2",
            content: "this is section 2"
        }
    ]


    const name = useInput("", () => false);
    const {payload, loading, error} = useFetch("https://api.coindesk.com/v1/bpi/currentprice.json")


    const {currentItems, changeItem} = useTab(0,content);

    console.log(currentItems);
    return (
        <div>
            <div className="bg-amber-400 flex-col flex justify-center items-center w-52 h-52">
                hello world!
                <input type="text" value={name.value} onChange={name.onChange}/>
            </div>
            {loading && <div>로딩중...</div>}
            {!loading && !error && <div>{payload.bpi.USD.rate}</div>}
            {error && !loading && <div>{error}</div>}
            {
                content.map((r,index) => <button className="border-2" onClick={()=>changeItem(index)}>{r.tab}</button>)
            }
            <div>{currentItems.content}</div>
        </div>
    );
};

export default HookStudy;