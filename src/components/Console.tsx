import { useEffect, useRef } from "react"
import { IActionCell, store } from "../store"

const Console = () => {
    const showRef = useRef<HTMLButtonElement>(null)
    const cellTestRef = useRef<HTMLButtonElement>(null)

    const show = () => { store.dispatch({ type: 'show' }) }
    const cellTest = () => {
        const actionToSend: IActionCell = { type: "cell", data: { c: 2, r: 2, mark: 'x', } }
        store.dispatch(actionToSend)
    }
    useEffect(() => {
        showRef.current?.addEventListener('click', show)
        cellTestRef.current?.addEventListener('click', cellTest)

        return () => {
            showRef.current?.removeEventListener('click', show)
            cellTestRef.current?.removeEventListener('click', cellTest)
        }
    }, [])

    return (
        <>
            <button ref={showRef}>show</button>
            <button ref={cellTestRef}>test</button>
        </>
    )
}

export { Console }