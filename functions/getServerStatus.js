'use strict';
import 'dotenv/config';
import axios from 'axios';
import { validateHost } from './validateHost.js';

// Base endpoint
const ping_server = process.env.PING_URL || 'https://api.mcsrvstat.us';

export async function getServerStatus(server, priority = 'high_priority') {
	// Validate the server IP first
	if (!validateHost(server.ip).valid) {
		throw new Error('Invalid server IP');
	}

	// Determine the endpoint based on platform
	let url;
	if (server.platform?.toLowerCase() === 'bedrock') {
		url = `${ping_server}/bedrock/3/${server.ip}`;
	} else {
		url = `${ping_server}/3/${server.ip}`; // default Java
	}

	// Call the API
	let response;
	try {
		response = await axios.get(url, { timeout: 5000 }); // 5s timeout
	} catch (error) {
		// If API fails, return a default offline object
		console.warn(`⚠️ Failed to ping ${server.ip}: ${error.message}`);
		return {
			online: false,
			motd: 'Server unreachable',
			players: { online: 0, max: 0, sample: [] },
			version: 'unknown',
			icon: null,
			latency: 0
		};
	}

	const data = response.data;

	// Normalize the response to match your bot's expectations
	const normalized = {
		online: data.online ?? false,
		motd: typeof data.motd === 'object' ? (data.motd.clean || data.motd.raw || data.motd.html || 'None') : data.motd || 'None',
		players: {
			online: data.players?.online ?? 0,
			max: data.players?.max ?? 0,
			sample: Array.isArray(data.players?.list)
				? data.players.list.map(p => ({ name: p }))
				: []
		},
		version: data.version || 'unknown',
		icon: data.icon ?? null,
		latency: data.debug?.ping || 0
	};

	return normalized;
}
