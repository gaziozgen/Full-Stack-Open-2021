import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        props.addVote(anecdote)
        console.log(props.notification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
    const filter = state.filter
    const filteredAnecdotes = state.anecdotes.filter((anecdote) => anecdote.content.includes(filter))
    filteredAnecdotes.sort((a, b) => b.votes - a.votes)
    return { anecdotes: filteredAnecdotes}
}

export default connect(
    mapStateToProps,
    {addVote, notification}
)(AnecdoteList)