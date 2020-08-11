import React, { useState } from 'react';
import './App.css';

function Memory() {

  const [restart, setRestart] = useState(false);
  const [time, restartTime] = useState(null);
  const [deck, setDeck] = useState([]);

  const pokeObj = {
    front: 'http://vignette3.wikia.nocookie.net/youtubepoop/images/4/4c/Pokeball.png/revision/latest',
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

  const shuffle = () => {
    let pokeDeck = pokeArray.sort(() => {
      return Math.floor(Math.random() * 3 - 1);
    });

    pokeDeck = pokeDeck.slice(0, 4).reduce((acc, poke) => {
      return acc.push(poke, poke);
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

  return (
    <div id='gameBoard'>
      {deck.map((card, i) => {
        return (
          <Card />
        )
      })}
    </div>
  );
}

function Card() {

  return (
    <div className='flip' id={this.props.id} onClick={this.props.handleClick.bind(this)}>
      <div className={turned} style={style}>
        <div className={`face back`}></div>
        <div className={`face front ${classes}`}></div>
      </div>
    </div>
  )
}

export default Memory;
