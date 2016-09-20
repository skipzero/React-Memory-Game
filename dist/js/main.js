'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
	// The back of the cards
	var POKEBALL = 'http://vignette3.wikia.nocookie.net/youtubepoop/images/4/4c/Pokeball.png/revision/latest';

	// The front of the cards
	var BULBASAUR = 'http://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png';
	var CHARMANDER = 'http://cdn.bulbagarden.net/upload/thumb/7/73/004Charmander.png/600px-004Charmander.png';
	var SQUIRTLE = 'http://cdn.bulbagarden.net/upload/thumb/3/39/007Squirtle.png/250px-007Squirtle.png';
	var PIKACHU = 'http://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png';
	var JIGGLYPUFF = 'http://cdn.bulbagarden.net/upload/thumb/3/3e/039Jigglypuff.png/250px-039Jigglypuff.png';
	var ABRA = 'http://cdn.bulbagarden.net/upload/6/62/063Abra.png';
	var GYARADOS = 'http://cdn.bulbagarden.net/upload/4/41/130Gyarados.png';
	var MEWTWO = 'http://cdn.bulbagarden.net/upload/thumb/7/78/150Mewtwo.png/250px-150Mewtwo.png';

	//  our monsterous array!
	var pokeArray = 'BULBASAUR, CHARMANDER, SQUIRTLE, PIKACHU, JIGGLYPUFF, ABRA, GYARADOS, MEWTWO';
	var arrCopy = pokeArray.slice();

	pokeArray = pokeArray.toLowerCase().split(', ');

	console.log('COPY', arrCopy);

	var Concentration = function (_React$Component) {
		_inherits(Concentration, _React$Component);

		function Concentration(props) {
			_classCallCheck(this, Concentration);

			var _this = _possibleConstructorReturn(this, (Concentration.__proto__ || Object.getPrototypeOf(Concentration)).call(this, props));

			_this.restart = _this.restart.bind(_this);
			_this.resetTime = null;

			_this.checkMatch = _this.checkMatch.bind(_this);

			_this.state = _this.cleanState();

			_this.state.deck = _this.shuffleDeck();
			return _this;
		}

		_createClass(Concentration, [{
			key: 'cleanState',
			value: function cleanState() {
				return {
					deck: this.shuffleDeck(),
					pairs: [],
					moves: 0,
					selected: [],
					endMsg: ''
				};
			}
		}, {
			key: 'gameBoard',
			value: function gameBoard() {
				var _this2 = this;

				return React.createElement(
					'div',
					{ id: 'gameBoard' },
					' ',
					this.state.deck.map(function (card, i) {
						return React.createElement(Card, {
							className: card,
							handleClick: _this2.clickHandler.bind(_this2, i),
							index: i,
							id: i,
							isSelected: _this2.state.selected.includes(i),
							key: i,
							didMatch: _this2.state.pairs.includes(i)
						});
					}, this)
				);
			}
		}, {
			key: 'clickHandler',
			value: function clickHandler(cid) {
				var _this3 = this;

				//  early return in case cards been selected this round or the timer is 'on'
				if (this.state.selected.includes(cid) || this.resetTime) {
					return;
				}

				if (this.state.selected.length >= 1) {
					this.resetTime = setTimeout(function () {
						_this3.checkMatch();
					}, 1500);
				}

				this.state.selected.push(cid);

				console.log(cid, 'PROPS', this.state.selected);
				this.setState({
					selected: this.state.selected
				});
			}
		}, {
			key: 'checkMatch',
			value: function checkMatch() {
				var _this4 = this;

				var moves = this.state.moves;
				var pairs = this.state.pairs;

				var matchSelected = this.state.selected.map(function (id) {
					return _this4.state.deck[id];
				});

				if (matchSelected[0] === matchSelected[1]) {
					pairs = pairs.concat(this.state.selected);
				}

				this.setState({
					selected: [],
					moves: moves,
					pairs: pairs
				});

				this.resetTime = null;

				if (this.state.pairs.length === 8) {
					this.setState({
						endMsg: 'You got them all!! Let\'s play again!!'
					});

					var newGame = setTimeout(function () {
						_this4.restart();
					}, 5000);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var gameboard = this.gameBoard();
				return React.createElement(
					'div',
					null,
					React.createElement(
						'div',
						{ className: 'endMsg' },
						this.state.endMsg
					),
					React.createElement(
						'div',
						{ className: 'score' },
						React.createElement(
							'span',
							null,
							this.state.pairs.length / 2
						)
					),
					gameboard
				);
			}

			//  Randomly pick 4 of the 8 cards to make our deck...

		}, {
			key: 'pickCards',
			value: function pickCards() {
				var deck = [];
				var pokeArrayCopy = pokeArray.slice();
				var i = 0;

				while (i < 4) {
					var j = 0;
					var randomNumber = this.randomNumber(pokeArrayCopy);
					var newCard = pokeArrayCopy.splice(randomNumber, 1)[0];

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

		}, {
			key: 'shuffleDeck',
			value: function shuffleDeck() {
				var deck = this.pickCards();

				for (var i = deck.length - 1; i > 0; i--) {
					var j = Math.floor(Math.random() * (i + 1));
					var tempVal = deck[i];
					deck[i] = deck[j];
					deck[j] = tempVal;
				}
				return deck;
			}
		}, {
			key: 'randomNumber',
			value: function randomNumber(arr) {
				var ourArray = arr;
				var min = 0;
				var max = ourArray.length - 1; //  using length of our array so we never get a number out of range
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}

			//  reset our game when all cards are matched... could be a reset button too...

		}, {
			key: 'restart',
			value: function restart() {
				this.setState(this.cleanState());
			}
		}]);

		return Concentration;
	}(React.Component);

	;

	//  Define our card class...
	//  Normally we'd separate this into it's own file

	var Card = function (_React$Component2) {
		_inherits(Card, _React$Component2);

		function Card() {
			_classCallCheck(this, Card);

			return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
		}

		_createClass(Card, [{
			key: 'render',
			value: function render() {
				var classes = this.props.className;
				var turned = this.props.isSelected ? 'card flipped' : 'card';
				var toggleVisible = this.props.didMatch ? 'hidden' : 'visible';

				var style = {
					visibility: toggleVisible
				};

				return React.createElement(
					'div',
					{ className: 'flip', id: this.props.id, onClick: this.props.handleClick.bind(this) },
					React.createElement(
						'div',
						{ className: turned, style: style },
						React.createElement(
							'div',
							{ className: 'face back' },
							' '
						),
						React.createElement(
							'div',
							{ className: 'face front ' + this.props.className },
							' '
						)
					)
				);
			}
		}]);

		return Card;
	}(React.Component);

	React.render(React.createElement(Concentration, null), document.getElementById('container'));
})();

//# sourceMappingURL=main.js.map