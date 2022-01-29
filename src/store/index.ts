import { createStore, Store } from "redux"
import { CellStatus } from "../global"

interface IState {
    field: CellStatus[][]
}
const initState: IState = { field: [] }

interface IAction {
    type: string,
    data?: any,
}
interface IActionInit extends IAction {
    type: 'init',
    data: {
        c: number,
        r: number,
    }
}
interface IActionCell extends IAction {
    type: "cell"
    data: {
        c: number,
        r: number,
        mark: CellStatus,
    },
}

const reducer = (oldState: IState = initState, action: IAction) => {
    switch (action.type) {
        case 'init':
            const row: CellStatus[] = []
            for (let r = 0; r < action.data.r; r++) {
                row.push(' ')
            }
            const field: CellStatus[][] = []
            for (let c = 0; c < action.data.c; c++) {
                field.push(row.slice())
            }
            return { ...oldState, field }
        case 'cell':
            if (!oldState.field.length) return oldState
            const field2: CellStatus[][] = JSON.parse(JSON.stringify(oldState.field))
            field2[action.data.c][action.data.r] = action.data.mark
            return { ...oldState, field: field2 }
        case 'show':
            console.log(oldState)
            return oldState
        default:
            return oldState
    }
}

const store: Store = createStore(reducer)

function testStore() {
    console.log(`test store`)
    console.log(store.getState())
}
testStore()

export type { IActionInit, IActionCell }
export { store }