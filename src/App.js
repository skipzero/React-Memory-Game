import React, { useState, useEffect } from 'react';
import './App.css';

const Memory = () => {

  const [deck, setDeck] = useState([]);
  const [pairs, setPairs] = useState([]);
  let [endMsg, setEndMsg] = useState('');
  let [moves, setMoves] = useState(0);

  let [selected, setSelected] = useState([]);


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
    setSelected([]);
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
      console.log(pokeDeck)
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pokeDeck[i];
      pokeDeck[i] = pokeDeck[j];
      pokeDeck[j] = temp;
    }
    setDeck(pokeDeck);
  }

  const checkMatch = (id) => {
    let matchedSelected = selected.map(id => deck[id])
    if (matchedSelected[0] === matchedSelected[1]) {
      const newPairs = pairs.concat(selected)
    }
    moves++;
    setSelected([])
    setMoves(moves);
    console.log('check match::::', id, selected)
  }

  const clickHandler = (id) => {
    // id.preventDefault();
    console.log('clicker....', id)
    let reset;
    if (selected.includes(id) || reset) {
      return;
    }
    if (selected.length >= 1) {
      reset = setTimeout(() => {
        checkMatch(id);
      }, 1500);
    }

    selected.push(id);
    setSelected(selected);
  }

  const gameBoard = () => {

    return (
      <div id='gameBoard'>
        {deck.map((card, i) => {
          console.log('CARD====', card)
          return (
            <Card className={card}
              handleClick={clickHandler.bind(null, i)}
              isSelected={selected.includes(i)}
              didMatch={pairs.includes(i)}
              key={i}
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
  console.log('Card::', props)
  const { handleClick, id, didMatch } = props;

  let [togglevisibility, setTogglevisibility] = useState(didMatch);
  let [turned, setTurned] = useState('card');
  let [classes, setClasses] = useState('');

  let style = {}

  console.log('PROPSSSS', props)

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




/*

  class Concentration extends React.Component {
    constructor(props) {
      super(props);
      this.restart = this.restart.bind(this);
      this.resetTime = null;
      this.checkMatch = this.checkMatch.bind(this);
      this.state = this.cleanState();
      this.state.deck = this.shuffleDeck();
    }

    cleanState() {
      return { deck: this.shuffleDeck(), pairs: [], moves: 0, selected: [], endMsg: '' };
    }

    gameBoard() {
      return (
        <div id='gameBoard'>
          {this.state.deck.map((card, i) => {
            return (
              <Card className={card}
                handleClick={this.clickHandler.bind(this, i)}
                index={i}
                id={i}
                isSelected={this.state.selected.includes(i)}
                key={i}
                didMatch={this.state.pairs.includes(i)} />
            );
          }, this)
          }
        </div>
      )
    }

    clickHandler(cid) {
      //  early return in case cards been selected this round or the timer is 'on'
      if (this.state.selected.includes(cid) || this.resetTime) {
        return;
      }

      if (this.state.selected.length >= 1) {
        this.resetTime = setTimeout(() => {
          this.checkMatch();
        }, 1500);
      }

      this.state.selected.push(cid);
      this.setState({ selected: this.state.selected });
    }

    checkMatch() {
      let moves = this.state.moves;
      let pairs = this.state.pairs;

      const matchSelected = this.state.selected.map((id) => {
        return this.state.deck[id];
      });

      if (matchSelected[0] === matchSelected[1]) {
        pairs = pairs.concat(this.state.selected);
      }

      moves++;
      this.setState({ selected: [], moves, pairs });

      this.resetTime = null;

      if (this.state.pairs.length === 8) {
        this.setState({ endMsg: 'You got them all!! Let\'s play again!!' });

        const newGame = setTimeout(() => {
          this.restart();
        }, 5000);
      }
    }

    render() {
      const gameboard = this.gameBoard();
      return (
        <div>
          <div className='endMsg'>{this.state.endMsg}</div>
          <div className='score'>
            <span>{this.state.moves}</span>
          </div>
          {gameboard}
        </div>
      );
    }

    //  Randomly pick 4 of the 8 cards to make our deck...
    pickCards() {
      pokeArray.sort(() => {
        return Math.floor(Math.random() * 3 - 1);
      });

      return pokeArray.slice(0, 4).reduce((acc, item) => {
        item = item.toLowerCase();
        acc.push(item, item);
        return acc;
      }, []);
    }

    //  Shuffle our cards after they're picked using the Fisher-Yates shuffle:
    // https://en.wikipedia.org/wiki/Fisher-Yates_shuffle
    shuffleDeck() {
      let deck = this.pickCards();

      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tempVal = deck[i];
        deck[i] = deck[j];
        deck[j] = tempVal;
      }
      return deck;
    }

    //  reset our game when all cards are matched... could be a reset button too...
    restart() {
      this.setState(this.cleanState());
    }
  };

  //  Define our card class...
  //  Normally we'd separate this into it's own file
  class Card extends React.Component {
    render() {
      const classes = this.props.className;
      const turned = this.props.isSelected ? 'card flipped' : 'card';
      const toggleVisible = this.props.didMatch ? 'hidden' : 'visible';

      let style = {
        visibility: toggleVisible
      };

      return (
        <div className='flip' id={this.props.id} onClick={this.props.handleClick.bind(this)}>
          <div className={turned} style={style}>
            <div className={`face back`}></div>
            <div className={`face front ${classes}`}></div>
          </div>
        </div>
      );
    }
  }

  React.render(<Concentration />, document.getElementById('container'));
})();
*/
