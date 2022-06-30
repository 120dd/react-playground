import {useEffect, useState} from "react";
import axios from "axios";

/**
 * input의 입력값 validation, 입력할때마다 값 변화하는 hook
 * @param initialValue
 * @param validator
 * @returns {{onChange: onChange, value: unknown}}
 */
export const useInput = (initialValue,validator) => {
    const [value, setValue] = useState(initialValue);

    let willUpdate = true;

    const onChange = (e) => {
        const target = e.target.value
        if (typeof validator === "function") {
            willUpdate = validator(target);
        }
        if (willUpdate) {
            setValue(target);
        }
    }

    return {value, onChange}
}

/**
 * url의 데이터를 axios를 이용하여 fetch하는 함수, loading의 값을 불리언으로 가져오고, 에러가 나면 알려준다
 * @param url
 * @returns {{payload: unknown, loading: boolean, error: string}}
 */
export const useFetch = (url) => {
    const [payload, setPayload] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const callUrl = async () => {
        try {
            const {data} = await axios.get(url);
            setPayload(data);
        } catch {
            setError("there is useFetch Error")
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        callUrl()
    },[])
    return {payload, loading, error}
}

/**
 * 배열의 현재 탭을 이벤트 대상 인덱스로 변경해주는 훅입니다
 * @param initialTab
 * @param allTabs
 * @returns {{currentItems: *, changeItem: (value: unknown) => void}}
 */
export const useTab = (initialTab, allTabs) => {
    const [contentIndex, setContentIndex] = useState(initialTab);
    if (!allTabs && !Array.isArray(allTabs)){
        return
    }
    return {
        currentItems: allTabs[contentIndex],
        changeItem: setContentIndex
    }
}