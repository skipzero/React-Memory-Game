'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var pokeArray = [BULBASAUR, CHARMANDER, SQUIRTLE, PIKACHU, JIGGLYPUFF, ABRA, GYARADOS, MEWTWO];

var Concentration = function (_React$Component) {
	_inherits(Concentration, _React$Component);

	function Concentration(props) {
		_classCallCheck(this, Concentration);

		var _this = _possibleConstructorReturn(this, (Concentration.__proto__ || Object.getPrototypeOf(Concentration)).call(this, props));

		_this.state = {
			deck: ['', 'mewtwo', '', '', '', '', '', 'mewtwo'],
			matches: 0,
			moves: 0
		};
		return _this;
	}

	_createClass(Concentration, [{
		key: 'render',
		value: function render() {
			var gameboard = this.gameBoard();

			return React.createElement(
				'div',
				null,
				gameboard
			);
		}
	}, {
		key: 'clickHandler',
		value: function clickHandler() {
			console.log('PROPS', this.state);
			this.state.moves += 1; //  increament our moves
		}
	}, {
		key: 'randomNumber',
		value: function randomNumber() {
			var min = 0;
			var max = 7;

			return Math.floor(Math.random() * (max - min + 1)) + min;
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
					return React.createElement(Card, { index: i, key: i, className: card, clickMon: _this2.clickHandler.bind(_this2) });
				}, this)
			);
		}
	}]);

	return Concentration;
}(React.Component);

;

//  Define our card class...

var Card = function (_React$Component2) {
	_inherits(Card, _React$Component2);

	function Card(props) {
		_classCallCheck(this, Card);

		return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));
	}

	_createClass(Card, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'card back ' + this.props.className, onClick: this.handleClick.bind(this) },
				' '
			);
		}
	}, {
		key: 'handleClick',
		value: function handleClick() {
			this.props.clickMon(this.props.pokemon, this.props.className);
			console.log('Card Props', this.props);
		}
	}]);

	return Card;
}(React.Component);

React.render(React.createElement(Concentration, null), document.getElementById('container'));

//# sourceMappingURL=main.js.map