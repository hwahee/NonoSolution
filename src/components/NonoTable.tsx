import { useEffect, useState } from "react"
import { IAction, store } from "../store"

interface IActionCell extends IAction {
    data: {
        coordination: {
            c: number,
            r: number,
        },
        mark: number,
    }
}
const cell_style=[]
const Cell = (props: { c: number, r: number }) => {
    const [mark, setMark] = useState(0)
    useEffect(() => {
        const actionToSend: IActionCell = { type: "CHANGE_CELL_MARK", data: { coordination: { c: props.c, r: props.r }, mark: mark, } }
        store.dispatch(actionToSend)
    }, [mark])


    return (
        <td>{props.c}{props.r}</td>
    )
}

const NonoTable = (props: { c: number, r: number }) => {

    
    const tdCellField=[]
    for(let c=0;c<props.c;c++){
        const tdRow=[]
        for(let r=0;r<props.r;r++){
            tdRow.push(<Cell c={c} r={r} />)
        }

        tdCellField.push(<tr>{tdRow}</tr>)
    }
    return (
        <table>
            <thead></thead>
            <tbody>
                {tdCellField}
            </tbody>
        </table>
    )
}

export { NonoTable }