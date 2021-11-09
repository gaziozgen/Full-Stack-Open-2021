import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()

    const filter = useSelector(state => state.filter)
    const filteredAnecdotes = useSelector(state => state.anecdotes.filter((anecdote) => anecdote.content.includes(filter)))
    filteredAnecdotes.sort((a, b) => b.votes - a.votes)

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(addVote(anecdote))
        console.log(dispatch(notification(`you voted '${anecdote.content}'`, 5))) 
    }

    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList