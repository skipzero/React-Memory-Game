// The back of the cards
const POKEBALL = 'http://vignette3.wikia.nocookie.net/youtubepoop/images/4/4c/Pokeball.png/revision/latest'

// The front of the cards
const BULBASAUR = 'http://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png'
const CHARMANDER = 'http://cdn.bulbagarden.net/upload/thumb/7/73/004Charmander.png/600px-004Charmander.png'
const SQUIRTLE = 'http://cdn.bulbagarden.net/upload/thumb/3/39/007Squirtle.png/250px-007Squirtle.png'
const PIKACHU = 'http://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png'
const JIGGLYPUFF = 'http://cdn.bulbagarden.net/upload/thumb/3/3e/039Jigglypuff.png/250px-039Jigglypuff.png'
const ABRA = 'http://cdn.bulbagarden.net/upload/6/62/063Abra.png'
const GYARADOS = 'http://cdn.bulbagarden.net/upload/4/41/130Gyarados.png'
const MEWTWO = 'http://cdn.bulbagarden.net/upload/thumb/7/78/150Mewtwo.png/250px-150Mewtwo.png'

const pokeArray = ('BULBASAUR CHARMANDER SQUIRTLE PIKACHU JIGGLYPUFF ABRA GYARADOS MEWTWO').toLowerCase().split(' ');

class Concentration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			deck: [],
			matches: 0,
			moves: 0,
		};
	}

	render() {
		const gameboard = this.gameBoard();

  	return (
			<div>
				{gameboard}
			</div>
		);
  }

	//  Randomly pick 4 of the 8 cards to make our deck...
  pickCards() {
    const deck = this.state.deck;
		let i = 0;

    while (i < 4) {
			let j = 0;
			const randomNumber = this.randomNumber();
      const newCard = pokeArray.splice(randomNumber, 1)[0];

		  while (j < 2) {
        deck.push(newCard);
				j++;
      }
      console.log('PickCard', randomNumber, deck);
			i++;
    }
		return deck;
  }

	//  Shuffle our cards after they're picked...
  makeDeck() {
    let deck = this.pickCards();
    for(let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tempVal = deck[i];
      deck[i] = deck[j];
      deck[j] = tempVal;
    }
    return deck;
  }

	clickHandler() {
    console.log('PROPS', this.state);
    this.state.moves += 1;  //  increament our moves
		this.pickCards();
	}

	randomNumber() {
		const min = 0;
		const max = pokeArray.length - 1;

		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	gameBoard() {
		console.log(this.makeDeck());
		return (
			<div id='gameBoard'> {
					this.state.deck.map((card, i) => {
						return (
							<Card index={i} key={i} className={card} clickMon={this.clickHandler.bind(this)} />
						);
					}, this)
				}</div>
		)
	}
};

//  Define our card class...
class Card extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={`card back ${this.props.className}`} onClick={this.handleClick.bind(this)}> </div>
		);
	}

	handleClick() {
    this.props.clickMon(this.props.pokemon, this.props.className)
    console.log('Card Props', this.props)
	}
}

React.render(<Concentration />, document.getElementById('container'));
