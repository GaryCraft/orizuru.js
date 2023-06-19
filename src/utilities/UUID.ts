
import { createHash } from "crypto";
import axios from "axios";
/**
 * This file contains functions for calculating UUIDs.
 * It is based on the Java Edition's algorithms.
 */

/**
 * @description
 * This function calculates the offline UUID of a player.
 * It is based on the algorithm used by the Java Edition.
 * @param username The username of the player.
 * @returns The offline UUID of the player.
 */
async function getOfflineUUID(username: string): Promise<string> {
	/*
	 * This function calculates the offline UUID of a player.
	 * It is based on the algorithm used by the Java Edition.
	 */
	const hash = createHash('md5'); // v3
	hash.update('OfflinePlayer:' + username);
	const data = hash.digest();
	const uuid = [...data];
	// https://www.rfc-editor.org/rfc/rfc4122#section-4.3
	uuid[6] = (data[6] & 0x0f) | 0x30; // v3
	uuid[8] = (data[8] & 0x3f) | 0x80;
	return splittedUUID(toHexString(uuid));
}

async function getOnlineUUID(username: string): Promise<string | null> {
	/*
	 * This function fetches the online UUID of a player.
	 * We use https://playerdb.co/ 's API to get the UUID.
	 */
	const response = await axios.get(`https://playerdb.co/api/player/minecraft/${username}`).catch((error) => {
		console.error(error);
		return null;
	});
	/* Example response:
	{
		code: 'player.found',
		message: 'Successfully found player by given ID.',
		data: {
			player: {
				meta: [Object],
				username: 'GaryCraft__',
				id: 'b038469f-594d-4b57-a2a5-e935c49bf705',
				raw_id: 'b038469f594d4b57a2a5e935c49bf705',
				avatar: 'https://crafthead.net/avatar/b038469f594d4b57a2a5e935c49bf705',
				name_history: []
			}
		},
		success: true
	}
	*/

	if (!response) {
		return null;
	}

	if (!response.data) {
		return null;
	}

	if(response.data.code !== 'player.found') {
		return null;
	}

	const { data } = response.data;
	const { id } = data.player;

	return id;
}

export { getOfflineUUID, getOnlineUUID };


function toHexString(byteArray: number[]) {
	return byteArray
		.map((byte) => ('0' + (byte & 0xff).toString(16)).slice(-2))
		.join('');
}

function splittedUUID(uuid: string) {
	return [
		uuid.substring(0, 8),
		uuid.substring(8, 12),
		uuid.substring(12, 16),
		uuid.substring(16, 20),
		uuid.substring(20, 32),
	].join('-');
}
