import { useEffect, useRef, useState } from "react"
import { BackgroundColor, CellStatus } from "../global"
import { IActionCell, IActionInit, store } from "../store"
import { Console } from "./Console"

const Cell = (props: { c: number, r: number }) => {
    const [mark, setMark] = useState<CellStatus>(' ')
    const ref = useRef<HTMLTableCellElement>(null)
    const mouseupEvent = (e: Event) => {
        setMark(i => {
            if (i === ' ') return 'o'
            else if (i === 'x') return ' '
            else return 'x'
        })
    }
    useEffect(() => {
        ref.current?.addEventListener('mouseup', mouseupEvent)
        return () => {
            ref.current?.removeEventListener('mouseup', mouseupEvent)
        }
    }, [])
    useEffect(() => {
        store.subscribe(() => {
            const storeField = store.getState().field
            if (storeField.length && storeField[props.c][props.r] !== mark)
                setMark(storeField[props.c][props.r])
        })
    }, [])
    useEffect(() => {
        const actionToSend: IActionCell = { type: "cell", data: { c: props.c, r: props.r, mark: mark, } }
        store.dispatch(actionToSend)
    }, [mark])

    return (
        <td ref={ref} style={{ backgroundColor: `${BackgroundColor[mark]}` }}>{props.c} {props.r}</td>
    )
}

const Seq = (props: { column?: boolean }) => {
    const [seq, setSeq] = useState<number[]>([])
    const ref = useRef<HTMLInputElement>(null)
    useEffect(() => {
        ref.current?.addEventListener('change', (e) => {
            const res = ref.current?.value.split(' ').map(i => parseInt(i))
            if (res?.every(i => i)) {
                setSeq(res)
            }
            else {
                setSeq([])
            }
        })
    }, [])

    return (
        <th>
            <input ref={ref} type='text' />
            <p>{seq}</p>
        </th>
    )
}

const NonoTable = (props: { c: number, r: number }) => {
    useEffect(() => {
        const actionToSend: IActionInit = { type: 'init', data: { c: props.c, r: props.r } }
        store.dispatch(actionToSend)
    }, [])

    const createCellField = () => {
        const tdCellField = []
        const tdCellFieldHead = [<th><Console /></th>]
        for (let r = 0; r < props.r; r++) {
            tdCellFieldHead.push(<Seq column />)
        }
        tdCellField.push(<tr>{tdCellFieldHead}</tr>)
        for (let c = 0; c < props.c; c++) {
            const tdRow = [<Seq />]
            for (let r = 0; r < props.r; r++) {
                tdRow.push(<Cell c={c} r={r} />)
            }

            tdCellField.push(<tr>{tdRow}</tr>)
        }
        return tdCellField
    }
    return (
        <table>
            <thead></thead>
            <tbody>
                {createCellField()}
            </tbody>
        </table>
    )
}

export { NonoTable }