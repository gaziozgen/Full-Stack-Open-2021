import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {

  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)

    case 'NEW_ANECDOTE':
      return state.concat(action.data);

    case 'INIT_ANECDOTES':
      return action.data;

    default:
      return state
  }
}

export const addVote = (anecdoteToVote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.voteAnecdote(anecdoteToVote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
    
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispach => {
    const anecdotes = await anecdoteService.getAll()
    dispach({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}



export default anecdoteReducer