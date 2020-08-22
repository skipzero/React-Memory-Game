import React, { useState, useEffect } from 'react';
import './App.css';

const Memory = () => {

  const [deck, setDeck] = useState([]);
  let [moves, setMoves] = useState(0);
  const endMsg = 'You caught them all! 😀'

  const pokeObj = {
    bulbasaur: 'http://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png',
    charmander: 'http://cdn.bulbagarden.net/upload/thumb/7/73/004Charmander.png/600px-004Charmander.png',
    squirtle: 'http://cdn.bulbagarden.net/upload/thumb/3/39/007Squirtle.png/250px-007Squirtle.png',
    pikachu: 'http://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png',
    jigglypuff: 'http://cdn.bulbagarden.net/upload/thumb/3/3e/039Jigglypuff.png/250px-039Jigglypuff.png',
    abra: 'http://cdn.bulbagarden.net/upload/6/62/063Abra.png',
    gyarados: 'http://cdn.bulbagarden.net/upload/4/41/130Gyarados.png',
    mewtwo: 'http://cdn.bulbagarden.net/upload/thumb/7/78/150Mewtwo.png/250px-150Mewtwo.png',
  };

  const pokeArray = Object.keys(pokeObj);
  useEffect(() => {
    shuffle();
  }, []);

  function shuffle() {
    let pokeDeck = pokeArray.sort(() => {
      return Math.floor(Math.random() * 3 - 1);
    });
    debugger;
    pokeDeck = pokeDeck.slice(0, 4).reduce((acc, poke) => {
      acc.push(poke, poke);
      return acc;
    }, []);

    //  Shuffle our cards after they're picked using the Fisher-Yates shuffle:
    // https://en.wikipedia.org/wiki/Fisher-Yates_shuffle
    for (let i = pokeDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pokeDeck[j];
      pokeDeck[i] = pokeDeck[j];
      pokeDeck[j] = temp;
    }
    setDeck(pokeDeck);
  }

  // const checkMatch = () => {
  //
  // }

  const clickHandler = (e) => {
    e.persist();
    moves++;
    setMoves(moves);
    console.log('Click', moves, e)
    return '';
  }

  const gameboard = () => {

    return (
      <div id="container">
        <div id='gameBoard'>
          {deck.map((card, i) => {
            console.log('CARD====', card)
            return (
              <Card className={card}
                handleClick={clickHandler}
                key={i}
                id={i} />
            )
          })}
        </div>
      </div>
    )
  };

  return (
    <>
      <div className='endMsg'>{endMsg}</div>
      <div className='score'>
        <span>{moves}</span>
        {}
      </div>
      {gameboard()}
    </>
  )
}

const Card = props => {
  console.log('Card::', props)
  debugger;
  let [togglevisibility, setTogglevisibility] = useState(props.didMatch);
  let [turned, setTurned] = useState('card');
  let [classes, setClasses] = useState('');

  let style = {}

  console.log('PROPSSSS', props)

  return (
    <div className='flip' id={props.id} onClick={props.handleClick}>
      <div className={turned} style={style}>
        <div className={`face back`}></div>
        <div className={`face front ${classes}`}></div>
      </div>
    </div>
  )
}

export default Memory;
