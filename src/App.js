import React, { useState, useEffect } from 'react';
import './App.css';

const Memory = () => {

  const [deck, setDeck] = useState([]);
  const [pairs, setPairs] = useState([]);
  let [endMsg, setEndMsg] = useState('');
  let [moves, setMoves] = useState(0);

  let selected = [];

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

  function resetState() {
    setDeck([]);
    setPairs([]);
    setEndMsg('');
    setMoves(0);
  }

  function shuffle() {
    // randomly sort our cards before taking 4
    let pokeDeck = pokeArray.sort(() => {
      return Math.floor(Math.random() * 3 - 1);
    });

    // pick 4 cards from our deck, add 2 of each to create our deck
    pokeDeck = pokeDeck.slice(0, 4).reduce((acc, poke) => {
      poke = poke.toLowerCase();
      acc.push(poke, poke);
      return acc;
    }, []);

    //  Shuffle our cards after they're picked using the Fisher-Yates shuffle:
    // https://en.wikipedia.org/wiki/Fisher-Yates_shuffle
    for (let i = pokeDeck.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));
      const temp = pokeDeck[i];
      pokeDeck[i] = pokeDeck[j];
      pokeDeck[j] = temp;
    }
    setDeck(pokeDeck);
  }

  const checkMatch = (id, selected, timer) => {
    let newPairs;
    let matchedSelected = selected.map(id => deck[id]);

    if (matchedSelected[0] === matchedSelected[1]) {
      const newPairs = pairs.concat(selected)
      setPairs(newPairs);
    }
    moves++;
    setMoves(moves);
    timer = null;

    if (pairs.length === 8) {
      setEndMsg('You got \'em all! Let\'s play again!');

      setTimeout(() => {
        resetState();
      }, 15000)
    }
  }

  const clickHandler = (id) => {

    let reset;
    if (selected.includes(id) || reset) {
      return;
    }

    if (selected.length >= 1) {
      reset = setTimeout(() => {
        checkMatch(id, selected, reset);
      }, 1500);
    }

    selected.push(id);
  }

  const gameBoard = (props) => {

    return (
      <div id='gameBoard'>
        {deck.map((card, i) => {

          return (
            <Card className={card}
              handleClick={clickHandler.bind(null, i)}
              isSelected={selected.includes(i)}
              didMatch={pairs.includes(i)}
              key={i}
              index={i}
              id={i} />
          )
        })}
      </div>
    )
  };

  const gameboard = gameBoard();
  return (
    <div>
      <div className='endMsg'>{endMsg}</div>
      <div className='score'>
        <span>{moves}</span>
        {}
      </div>
      {gameboard}
    </div>
  )
}

const Card = props => {
  let turned = 'false';
  const { handleClick, id, didMatch } = props;
  let classes = props.className;
  turned = turned ? 'card ---' : 'card';

  let style = {}


  return (
    <div className='flip' id={id} onClick={handleClick}>
      <div className={turned} style={style}>
        <div className={`face back`}></div>
        <div className={`face front ${classes}`}></div>
      </div>
    </div>
  )
}

export default Memory;
