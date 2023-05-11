import React from 'react'
import './notesCard.css'

const NotesCard = ({id, title, body}) => {
  return (
    <div className="notes-card">
        <p className="notes-card-title">
            Tuesday Plans
        </p>
        <div className="notes-card-body">
            If it does not rain, I will go visit all my friends
            and go to the movies. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nulla dignissimos odio. Deserunt vero dolor cupiditate nobis. Eius, expedita blanditiis tenetur eligendi quis repellat velit libero harum quibusdam magni ullam.
        </div>
    </div>
    )
}

export default NotesCard