(() => {
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

//  our monsterous array!
let pokeArray = 'BULBASAUR, CHARMANDER, SQUIRTLE, PIKACHU, JIGGLYPUFF, ABRA, GYARADOS, MEWTWO';
const arrCopy = pokeArray.slice();

pokeArray = pokeArray.toLowerCase().split(', ');

console.log('COPY', arrCopy);

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
		return {
			deck: [],
			pairs: [],
			moves: 0,
			selected: [],
		};
	}

	gameBoard() {
		return (
			<div id='gameBoard'> {
					this.state.deck.map((card, i) => {
						return (
							<Card
								className={card}
								handleClick={this.clickHandler.bind(this, i)}
								index={i}
								id={i}
								isSelected={this.state.selected.includes(i)}
								key={i}
								didMatch={this.state.pairs.includes(i)}
							/>
						);
					}, this)
				}
			</div>
		)
	}

	clickHandler(cid) {
		//  early return in case cards been selected this round or the timer is 'on'
		if(this.state.selected.includes(cid) || this.resetTime) {
			return;
		}

		console.log('Clicker...', this.state.selected);

		if(this.state.selected.length >= 1) {
			this.resetTime = setTimeout(() => {
				console.log('Inside setTimeout....')
				this.checkMatch()
			}, 1000);
		}

		this.state.selected.push(cid)

    console.log(cid, 'PROPS', this.state.selected);
		this.setState({
			selected: this.state.selected
		})
	}

	checkMatch() {
		let click = this.state.pairs;
		console.log('Checking the matches...');
		let pairs = this.state.pairs;

		const matchSelected = this.state.selected.map((id) => {
		console.log('selectedPoke =========', this.state.deck[id])
			return this.state.deck[id]
		});
		console.log('selected>>', matchSelected, pairs)


		if(matchSelected[0] === matchSelected[1]) {
			pairs = pairs.concat(this.state.selected);
						console.log('Selections', matchSelected[0], matchSelected[1]);
		}
console.log('Matcher', pairs)
		this.setState({
			selected: [],
			moves: click++,
			pairs
		});
		this.resetTime = null;
		if(this.state.pairs.length === 8) {
			this.restart();
		}
	}

	render() {
		const gameboard = this.gameBoard();
  	return (
			<div>
				<div className='score'>
					<span>{this.state.pairs.length / 2}</span>
				</div>
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
			i++;
    }
		return deck;
  }

	//  Shuffle our cards after they're picked using the Fisher-Yates shuffle:
  // https://en.wikipedia.org/wiki/Fisher-Yates_shuffle
  shuffleDeck() {
    let deck = this.pickCards();
    for(let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tempVal = deck[i];
      deck[i] = deck[j];
      deck[j] = tempVal;
    }
		console.log('Shuffled...', deck)
    return deck;
  }

	randomNumber() {
		const min = 0;
		const max = pokeArray.length - 1;  //  using length of our array so we never get a number out of range
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	//  reset our game when all cards are matched...
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
			visibility: toggleVisible,
		};

		return (
			<div className='flip' id={this.props.id} onClick={this.props.handleClick.bind(this)}>
				<div className={turned} style={style}>
					<div className={`face front ${this.props.className}`}> </div>
					<div className='face back'> </div>
				</div>
			</div>
		);
	}
}

React.render(<Concentration />, document.getElementById('container'));
})();
