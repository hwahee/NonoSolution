function nonoALine(field: number[][], c: number, r: number, args: number[]) {
    const fieldNum = field.length

    //매개변수 검사
    if (args.some((elem) => (elem <= 0))) {
        console.log(`There is an INVALID number in args`)
        return
    }
    //수 검사
    const sum = args.reduce((a, b) => (a + b)) + args.length - 1
    if (fieldNum < sum) {
        console.log(`Args(${sum}) are more than ${fieldNum}.`)
        return
    }

    //한 윈소를 기준으로 나머지는 가장자리에 최대한 붙게 배치하여
    //그 윈소가 차지할 가능성이 잇는 가장 넓은 영역을 만든 다음
    //한번은 최대한 왼쪽에 붙이고, 한번은 최대한 오른쪽에 붙여서
    //두 경우에서 중복되는 가운데의 영역은 무조건 차지하게 됨
    for (let index = 0; index < args.length; index++) {
        let LCursor = 0, RCursor = fieldNum - 1
        for (let L = 0; L < index; L++) {
            LCursor += args[L] + 1
        }
        for (let R = args.length - 1; index + 1 <= R; R--) {
            RCursor -= args[R] + 1
        }
        LCursor += args[index] - 1
        RCursor -= args[index] - 1
        if (RCursor <= LCursor)
            for (let i = RCursor; i <= LCursor; i++) {
                if (c <= 0)
                    field[i][r] = 1
                else if (r <= 0)
                    field[c][i] = 1
            }
    }
}
function showLine(arr: number[]) {
    console.log(arr.map((i) => i ? '■' : '□').toString().replaceAll(',', ''))
}

function nonoLines(linesNum: number, argsCol?: number[][], argsRow?: number[][]) {
    let field: number[][] = Array(linesNum)
    for (let i = 0; i < linesNum; i++)
        field[i] = Array(linesNum).fill(0)

    if (argsCol) {
        for (let c = 0; c < linesNum; c++) {
            nonoALine(field, c, -1, argsCol[c])
        }
    }
    if (argsRow) {
        for (let r = 0; r < linesNum; r++) {
            nonoALine(field, -1, r, argsRow[r])
        }
    }

    let fieldString = "\n"
    field.forEach((i) => {
        fieldString += i.toString().replaceAll('0', '□').replaceAll('1', '■').replaceAll(',', ' ') + '\n'
    })
    console.log(fieldString)
}

function test() {
    const lines = 50
    nonoLines(lines,
        [
            [16,],
            [13,],
            [10, 3,],
            [3, 6, 2,],
            [1, 8, 5, 2,],
            [1, 1, 6, 2,],
            [7, 4, 3,],
            [2, 3, 2, 2, 3,],
            [2, 5, 5, 1, 1, 2,],
            [2, 3, 3, 3,],
            [1, 1, 3, 1, 3,],
            [2, 1, 3,],
            [3, 2, 1, 1, 1,],
            [2, 3, 1, 1, 1,],
            [1, 3, 3, 1,],
            [1, 2, 4, 1,],
            [3, 2, 3, 6,],
            [2, 3, 14,],
            [2, 4, 7, 1, 2,],
            [1, 9, 3,],
            [2, 3, 5, 3,],
            [2, 1, 2,],
            [5, 4, 4,],
            [3, 4, 5, 1,],
            [10, 6, 1,],
            [3, 6, 1, 3, 1,],
            [6, 9, 5,],
            [5, 8, 3,],
            [3, 1, 7, 3,],
            [1, 1, 4, 3,],
        ],
        [
            [3, 4, 3, 1, 4],
            [1, 4, 3, 3, 1, 1, 4],
            [1, 1, 1, 1, 7],
            [8, 9],
            [3, 3, 3, 5, 2],
            [5, 5, 5, 1, 1, 1],
            [3, 1, 1, 2, 3, 1, 1],
            [5, 1, 1, 1, 3, 3],
            [5, 2, 2, 6],
            [5, 3, 2, 8],
            [5, 1, 2, 7],
            [5, 1, 2, 1, 2, 6],
            [11, 4, 1, 5],
            [2, 6, 6, 1, 5],
            [1, 3, 3, 3, 1, 4],
            [1, 3, 2, 7],
            [1, 2, 2, 2, 3, 1],
            [1, 2, 8],
            [1, 1, 2, 4, 10],
            [1, 1, 1, 1, 7, 3, 2],
            [1, 5, 4, 6],
            [4, 4],
            [1, 2, 2, 3, 3],
            [9, 3],
            [9, 7, 2],
        ]
    )
}


