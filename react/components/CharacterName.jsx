import React from 'react';

const CharacterName = (props) => {
    {console.log(props.listOfCharacters)}
    return (
        <div className="card" style={{flex:'1',minWidth:'300px', maxWidth: '45%'}}>
            <div className="card bg-light">
                <div className="card-text">
                    {
                        props.listOfCharacters.length > 0 && 
                            props.listOfCharacters.map((c) =>(
                                <p key={c.id}>{c.name}</p>
                            ))
                        
                    } 
                    </div>

            </div>
        </div>

    )
};

export default CharacterName;