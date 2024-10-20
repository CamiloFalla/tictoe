export const saveGame = ({board, turn}) => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const resetGame = ({})=>{
    window.localStorage.renoveItem('board')
    window.localStorage.renoveItem('turn')
}