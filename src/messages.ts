
export const messages = new Map([
	['id_already_used', 'The provided game ID already exists and cannot be reused!'],
	['game_not_found', 'The game with the provided ID was not found!'],
	['game_already_in', 'You have already joined the game!'],
	['game_session_full', 'This game session has already reached its players limit!'],
	['creator_left', 'The creator has left the game!'],
	['too_few_players', 'Too few players left in the game!'],
])

export const t = (key: string): string => {
	const res = messages.get(key)
	return res ? res : key
}


