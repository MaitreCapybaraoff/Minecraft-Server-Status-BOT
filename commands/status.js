'use strict';
import { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { createCanvas, loadImage } from 'canvas';
import { beaver } from '../functions/consoleLogging.js';
import { findDefaultServer, findServer } from '../functions/findServer.js';
import { getServerStatus } from '../functions/getServerStatus.js';
import { isValidServer, noMonitoredServers } from '../functions/inputValidation.js';
import { embedColor, sendMessage } from '../functions/sendMessage.js';
import {
	MOTDLocalizations,
	descriptionLocalizations,
	errorMessageLocalizations,
	latencyLocalizations,
	nameLocalizations,
	noMOTDLocalizations,
	noPlayersLocalizations,
	noServerVersionLocalizations,
	platformDescriptionLocalizations,
	platformLocalizations,
	playersOnlineLocalizations,
	serverDescriptionLocalizations,
	serverLocalizations,
	serverOfflineLocalizations,
	serverVersionLocalizations,
	statusForLocalizations
} from '../localizations/status.js';

export const data = new SlashCommandBuilder()
	.setName('status')
	.setNameLocalizations(nameLocalizations)
	.setDescription('Displays the current status and active players for any server')
	.setDescriptionLocalizations(descriptionLocalizations)
	.addStringOption(option =>
		option
			.setName('server')
			.setNameLocalizations(serverLocalizations)
			.setDescription('Server IP address or nickname')
			.setDescriptionLocalizations(serverDescriptionLocalizations)
			.setRequired(false)
	)
	.addStringOption(option =>
		option
			.setName('platform')
			.setNameLocalizations(platformLocalizations)
			.setDescription('Server platform')
			.setDescriptionLocalizations(platformDescriptionLocalizations)
			.setRequired(false)
			.setChoices({ name: 'Java', value: 'java' }, { name: 'Bedrock', value: 'bedrock' })
	);

function generateMOTDImage(motd) {
	// Canvas dimensions
	const width = 600;
	const height = 100;

	const canvas = createCanvas(width, height);
	const ctx = canvas.getContext('2d');

	// Fond noir
	ctx.fillStyle = '#2C2F33';
	ctx.fillRect(0, 0, width, height);

	// Texte du MOTD
	ctx.fillStyle = '#FFFFFF';
	ctx.font = '28px sans-serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	// Si motd trop long, on peut le wrap
	const lines = [];
	const words = motd.split(' ');
	let line = '';
	for (const word of words) {
		const testLine = line + word + ' ';
		const metrics = ctx.measureText(testLine);
		if (metrics.width > width - 20) {
			lines.push(line);
			line = word + ' ';
		} else {
			line = testLine;
		}
	}
	lines.push(line);

	lines.forEach((l, i) => {
		ctx.fillText(l.trim(), width / 2, 30 + i * 30);
	});

	return canvas.toBuffer();
}

export async function execute(interaction) {
	let server;

	if (interaction.options.getString('server')) {
		server = await findServer(interaction.options.getString('server'), ['nickname', 'ip'], interaction.guildId);
		if (!server) {
			server = {
				ip: interaction.options.getString('server'),
				platform: interaction.options.getString('platform') || 'java'
			};
		}
	} else {
		if (await noMonitoredServers(interaction.guildId, interaction, true)) return;
		server = await findDefaultServer(interaction.guildId);
	}

	if (!(await isValidServer(server.ip, interaction))) return;

	let serverStatus;
	try {
		serverStatus = await getServerStatus(server);
	} catch (error) {
		beaver.log('status', 'Error pinging Minecraft server while running status command', server.ip);
		await sendMessage(
			interaction,
			errorMessageLocalizations[interaction.locale]
				? `**${error.message || error}**. ${errorMessageLocalizations[interaction.locale]}`
				: `**${error.message || error}**. This error was encountered while trying to get server status. Please verify the server address, and try again later.`
		);
		return;
	}

	if (!serverStatus || !serverStatus.online) {
		await sendMessage(
			interaction,
			serverOfflineLocalizations[interaction.locale] ?? `*The server is offline!*`,
			`${statusForLocalizations[interaction.locale] ?? 'Status for'} ${server.ip}:`
		);
		return;
	}

	let message;
	const playersOnline = serverStatus.players?.online ?? 0;
	const playersMax = serverStatus.players?.max ?? 0;

	if (playersOnline === 0) {
		message = noPlayersLocalizations[interaction.locale] ?? `*No one is playing!*`;
	} else {
		message = `**${playersOnline} / ${playersMax}** ${playersOnlineLocalizations[interaction.locale] ?? 'player(s) online.'}`;

		if (Array.isArray(serverStatus.players?.sample) && serverStatus.players.sample.length) {
			let players = serverStatus.players.sample.map(p => p.name).sort().join(', ');
			message += `\n\n${players}`;
		}
	}

	// Préparer l'image MOTD
	const motdText = (() => {
		const motd = serverStatus.motd;
		if (!motd) return 'None';
		if (Array.isArray(motd)) return motd.join(' ');
		if (typeof motd === 'object') {
			if (motd.clean) return Array.isArray(motd.clean) ? motd.clean.join(' ') : String(motd.clean);
			if (motd.raw) return Array.isArray(motd.raw) ? motd.raw.join(' ') : String(motd.raw);
			if (motd.html) return Array.isArray(motd.html) ? motd.html.join(' ') : String(motd.html);
		}
		return String(motd);
	})();
	const motdBuffer = generateMOTDImage(motdText);
	const motdAttachment = new AttachmentBuilder(motdBuffer, { name: 'motd.png' });

	const responseEmbed = new EmbedBuilder()
		.setTitle(`${statusForLocalizations[interaction.locale] ?? 'Status for'} ${server.ip}:`)
		.setColor(embedColor)
		.setDescription(message)
		.setImage('attachment://motd.png')
		.addFields(
			{
				name: serverVersionLocalizations[interaction.locale] ?? 'Server version:',
				value: serverStatus.version?.name || (noServerVersionLocalizations[interaction.locale] ?? 'Not specified'),
				inline: true
			},
			{
				name: latencyLocalizations[interaction.locale] ?? 'Latency:',
				value: `${Math.round(serverStatus.latency ?? 0)} ms`,
				inline: true
			}
		);

	const files = [motdAttachment];
	if (serverStatus.icon) {
		try {
			const iconBuffer = Buffer.from(serverStatus.icon.split(',')[1], 'base64');
			files.push(new AttachmentBuilder(iconBuffer, { name: 'icon.jpg' }));
			responseEmbed.setThumbnail('attachment://icon.jpg');
		} catch {
			console.warn('⚠️ Failed to parse server icon');
		}
	}

	await interaction.editReply({ embeds: [responseEmbed], files });
}
