interface Config {
	apiUrl: string;
	apiUrlWS: string;
	apiUrlRest: string;
	recaptchaSiteKey: string;
	googleSiteId: string;
	facebookSiteId: string;
	markets: {
		[attribute: string]: {
			pricePrecision: number;
			minTradeAmount: number;
		};
	};
	symbols: {
		[attribute: string]: {
			amountPrecision: number;
		};
	};
}

const envConfig = {
	local: {
		apiUrl: "http://localhost:4301/gql/api",
		apiUrlWS: "ws://localhost:4301/subscriptions",
		apiUrlRest: "http://localhost:4301/",
		recaptchaSiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
		googleSiteId: "933100312195-1v2ulsliddmbhqbkh84bg36k5q6krmv3.apps.googleusercontent.com",
		facebookSiteId: "964684310657736",
		markets: {},
		symbols: {}
	},
	dev: {
		apiUrl: "http://localhost:4301/gql/api",
		apiUrlWS: "ws://localhost:4301/subscriptions",
		apiUrlRest: "http://localhost:4301/",
		recaptchaSiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
		googleSiteId: "933100312195-1v2ulsliddmbhqbkh84bg36k5q6krmv3.apps.googleusercontent.com",
		facebookSiteId: "964684310657736",
		markets: {},
		symbols: {}
	},
	pre: {
		apiUrl: "http://localhost:4301/gql/api",
		apiUrlWS: "ws://localhost:4301/subscriptions",
		apiUrlRest: "http://localhost:4301/",
		recaptchaSiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
		googleSiteId: "933100312195-1v2ulsliddmbhqbkh84bg36k5q6krmv3.apps.googleusercontent.com",
		facebookSiteId: "964684310657736",
		markets: {},
		symbols: {}
	},
	prod: {
		apiUrl: "http://localhost:4301/gql/api",
		apiUrlWS: "ws://localhost:4301/subscriptions",
		apiUrlRest: "http://localhost:4301/",
		recaptchaSiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
		googleSiteId: "933100312195-1v2ulsliddmbhqbkh84bg36k5q6krmv3.apps.googleusercontent.com",
		facebookSiteId: "964684310657736",
		markets: {},
		symbols: {}
	},
};

let config: Config;

switch (process.env.REACT_APP_STAGE) {
	case "dev":
		config = envConfig.dev;
		break;
	case "pre":
		config = envConfig.pre;
		break;
	case "prod":
		config = envConfig.prod;
		break;
	default:
		config = envConfig.local;
}

// precision: "this affects price column, in orderbooks - price, in last trades - price and in trading panel - price"
config.markets = {
	default: {
		pricePrecision: 6,
		minTradeAmount: 0.000001,
	},
};

// precision: "my assets related columns, amount columns in trade panel & orderbooks  &  lasttrade, withdrawals, trading history, etc"
config.symbols = {
	default: {
		amountPrecision: 6,
	},
};

export default Object.freeze(config);
