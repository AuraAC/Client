export const TRANSACTION_TYPE: any = {
	1: 'Deposit bank', // DEPOSIT_BANK,
	2: 'Deposit crypto', // DEPOSIT_CRYPTO,
	3: 'Deposit E-payment', // DEPOSIT_EPAYMENT,
	4: 'Withdrawal bank', // WITHDRAW_BANK,
	5: 'Withdrawal SEPA', // WITHDRAW_SEPA,
	6: 'Withdrawal crypto', // WITHDRAW_CRYPTO
	7: 'Transfer', // TRANSFER
	8: 'Emitting', // EMITTING
	9: 'Burning', // BURNING
};

export const PROCESSING_STATUS: any = {
	1: 'Pending',
	2: 'Rejected',
	3: 'Confirmed',
	4: 'Succeeded',
	5: 'Failed',
};
