import { useEffect, useState } from "react"

export function useLocalStorege<T>(key: string, initValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonVal = localStorage.getItem(key)
        if (jsonVal == null) {
            if (typeof initValue === "function") return (initValue as () => T)()
            else return initValue
        } else return JSON.parse(jsonVal)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])
    
    return [value, setValue] as [T, typeof setValue]
    
}
