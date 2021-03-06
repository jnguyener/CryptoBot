/* eslint-disable no-return-assign,no-eval */
import Discord from 'discord.js'
const request = require('request')
const ftploy = require('ftploy')
const JSFtp = require('jsftp')
const fs = require('fs')
const BigNumber = require('bignumber.js')
const client = new Discord.Client({autoReconnect: true})

const config = require('./config.json')
const prefix = config.prefix

const cmImageRoot = 'https://files.coinmarketcap.com/static/img/coins/32x32/'
const cmMoreInfoRoot = 'https://coinmarketcap.com/currencies/'

const ftpInformation = {
  username: config.FTPLogin.user,
  password: config.FTPLogin.password,
  host: config.FTPLogin.host,
  port: config.FTPLogin.port,
  localRoot: './',
  remoteRoot: '../../../',
  files: [
    'cryptobotAPI.json'
  ]
}
const Ftp = new JSFtp({
  host: config.FTPLogin.host,
  port: config.FTPLogin.port,
  user: config.FTPLogin.user,
  pass: config.FTPLogin.password
})

const clean = text => {
  if (typeof (text) === 'string') {
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
  } else {
    return text
  }
}

client.on('guildCreate', guild => {
  if (config.useFTP === true) {
    Ftp.raw('dele', 'C:\\cryptobotAPI.json')
    let guildsInformation = {
      totalUser: client.guilds.reduce((mem, g) => mem += g.memberCount, 0),
      totalServer: client.guilds.size.toLocaleString()
    }
    fs.writeFile('./cryptobotAPI.json', JSON.stringify(guildsInformation), (err) => {
      if (err) console.error(err)
    })
    ftploy(ftpInformation)
  }
  console.log(`>_ Bot added on : ${guild.name} (${guild.id})`)
  console.log('>_ ' + client.guilds.size.toLocaleString() + ' servers | ' + client.guilds.reduce((mem, g) => mem += g.memberCount, 0) + ' users')
  console.log('>_ ')
  client.user.setGame('$help - ' + client.guilds.size.toLocaleString() + ' servers | ' + client.guilds.reduce((mem, g) => mem += g.memberCount, 0) + '  Users')
})
client.on('guildDelete', guild => {
  if (config.useFTP === true) {
    Ftp.raw('dele', 'C:\\cryptobotAPI.json')
    let guildsInformation = {
      totalUser: client.guilds.reduce((mem, g) => mem += g.memberCount, 0),
      totalServer: client.guilds.size.toLocaleString()
    }
    fs.writeFile('./cryptobotAPI.json', JSON.stringify(guildsInformation), (err) => {
      if (err) console.error(err)
    })
    ftploy(ftpInformation)
  }
  console.log(`>_ Bot deleted on : ${guild.name} (${guild.id})`)
  console.log('>_ ' + client.guilds.size.toLocaleString() + ' servers | ' + client.guilds.reduce((mem, g) => mem += g.memberCount, 0) + ' users')
  console.log('>_')
  client.user.setGame('$help - ' + client.guilds.size.toLocaleString() + ' servers | ' + client.guilds.reduce((mem, g) => mem += g.memberCount, 0) + '  Users')
})

client.on('guildMemberAdd', (member) => {
  if (config.useFTP === true) {
    Ftp.raw('dele', 'C:\\cryptobotAPI.json')
    let guildsInformation = {
      totalUser: client.guilds.reduce((mem, g) => mem += g.memberCount, 0),
      totalServer: client.guilds.size.toLocaleString()
    }
    fs.writeFile('./cryptobotAPI.json', JSON.stringify(guildsInformation), (err) => {
      if (err) console.error(err)
    })
    ftploy(ftpInformation)
  }
  const guild = member.guild
  client.user.setGame('$help - ' + client.guilds.size.toLocaleString() + ' servers | ' + client.guilds.reduce((mem, g) => mem += g.memberCount, 0) + '  Users')
  console.log(`>_ ${member.user.username}#${member.user.discriminator} as join ${guild.name} (${guild.id})`)
})
client.on('guildMemberRemove', (member) => {
  if (config.useFTP === true) {
    Ftp.raw('dele', 'C:\\cryptobotAPI.json')
    let guildsInformation = {
      totalUser: client.guilds.reduce((mem, g) => mem += g.memberCount, 0),
      totalServer: client.guilds.size.toLocaleString()
    }
    fs.writeFile('./cryptobotAPI.json', JSON.stringify(guildsInformation), (err) => {
      if (err) console.error(err)
    })
    ftploy(ftpInformation)
  }
  const guild = member.guild
  client.user.setGame('$help - ' + client.guilds.size.toLocaleString() + ' servers | ' + client.guilds.reduce((mem, g) => mem += g.memberCount, 0) + '  Users')
  console.log(`>_ ${member.user.username}#${member.user.discriminator} as left ${guild.name} (${guild.id})`)
})

client.on('ready', () => {
  if (config.useFTP === true) {
    Ftp.raw('dele', 'C:\\cryptobotAPI.json')
    let guildsInformation = {
      totalUser: client.guilds.reduce((mem, g) => mem += g.memberCount, 0),
      totalServer: client.guilds.size.toLocaleString()
    }
    fs.writeFile('./cryptobotAPI.json', JSON.stringify(guildsInformation), (err) => {
      if (err) console.error(err)
    })
    ftploy(ftpInformation)
  }
  console.log('########################################')
  console.log('#                                      #')
  console.log('#               CryptoBot              #')
  console.log('#                V_' + config.botVersion + '               #')
  console.log('#                                      #')
  console.log('########################################')
  console.log('>_ ' + client.guilds.size + ' servers | ' + client.guilds.reduce((mem, g) => mem += g.memberCount, 0) + ' users')
  console.log('>_ ')
  client.user.setGame('$help - ' + client.guilds.size + ' servers | ' + client.guilds.reduce((mem, g) => mem += g.memberCount, 0) + ' users')
})

client.on('message', message => {
  if (message.author.id === client.user.id) return
  if (message.channel.recipient) return
  if (!message.content.startsWith(prefix)) return
  if (!message.channel.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  if (command === 'money') {
    message.delete()
    message.channel.send({
      embed: {
        color: 16750848,
        title: 'Please wait ...'
      }
    }).then((message) => {
      getCoinData(args[0], message, false, function (message, data) {
        if (data) {
          var satPrice = data.price_btc !== null ? BigNumber(data.price_btc).times(100000000).toString() + ' sats' : 'Unknown price'
          const embed = new Discord.RichEmbed()
            .setColor('#ffc107') // Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
            .setTitle(data.name + ' (' + data.symbol + ') stats')
            .setDescription('[More info here](' + cmMoreInfoRoot + data.id + '/)')
            .setThumbnail(cmImageRoot + data.id + '.png')
            .addField('Price (in USD)', '$' + data.price_usd)
            .addField('Price (in Satoshis)', satPrice)
            .addField('Percentage Change (1hr)', data.percent_change_1h + '%')
            .addField('Percentage Change (24hr)', data.percent_change_24h + '%')
          message.edit({embed})
        } else {
          const embed = new Discord.RichEmbed()
            .setColor('#ffc107')
            .setTitle('Not available')
          message.edit({embed})
        }
      })
    })
  }
  if (command === 'sats') {
    message.delete()
    message.channel.send({
      embed: {
        color: 16750848,
        title: 'Please wait ...'
      }
    }).then((message) => {
      getCoinData(args[0], message, true, function (message, data, btc) {
        if (data) {
          var satPrice = 'Unknown price'
          var sat1Hr = 'Unknown price'
          var sat24Hr = 'Unknown price'

          // Some really small coins don't have prices listed, handle case
          if (data.price_btc !== null) {
            var satPrice = BigNumber(data.price_btc).times(100000000).toString() + ' sats'

            // Calculate the percent change of price relative to Bitcoin
            var btc1HrPct = BigNumber(btc.percent_change_1h).dividedBy(100).plus(1)
            var btc24HrPct = BigNumber(btc.percent_change_24h).dividedBy(100).plus(1)

            var coin1HrPct = BigNumber(data.percent_change_1h).dividedBy(100).plus(1)
            var coin24HrPct = BigNumber(data.percent_change_24h).dividedBy(100).plus(1)

            // ((AltCoin price change) / (BitCoin Price change))
            var sat1Hr = coin1HrPct.dividedBy(btc1HrPct).minus(1).times(100)
            var sat24Hr = coin24HrPct.dividedBy(btc24HrPct).minus(1).times(100)
          }

          const embed = new Discord.RichEmbed()
            .setColor('#ffc107')
            .setTitle(data.name + ' (' + data.symbol + ') stats')
            .setDescription('[More info here](' + cmMoreInfoRoot + data.id + '/)')
            .setThumbnail(cmImageRoot + data.id + '.png')
            .addField('Price in Satoshis', satPrice)
            .addField('Percentage Change (1hr)', sat1Hr.toFixed(2) + '%')
            .addField('Percentage Change (24hr)', sat24Hr.toFixed(2) + '%')
          message.edit({embed})
        } else {
          const embed = new Discord.RichEmbed()
            .setColor('#ffc107')
            .setTitle('Not available')
          message.edit({embed})
        }
      })
    })
  }
  if (command === 'marketcap') {
    message.delete()
    message.channel.send({
      embed: {
        color: 16750848,
        title: 'Please wait ...'
      }
    })
      .then((message) => {
        request('https://api.coinmarketcap.com/v1/global/', function (err, response, body) {
          if (err) {
            message.channel.sendMessage('```Error! ' + err + '```')
            return false
          }

          const data = JSON.parse(body)
          const embed = new Discord.RichEmbed()
            .setColor('#ffc107') // Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
            .setTitle('Market Capitalization Stats')
            .setDescription('[More info here](https://coinmarketcap.com/)')
            .setThumbnail('https://coinmarketcap.com/static/img/CoinMarketCap.png')
            .addField('Total Market Cap (in USD)', '$' + data.total_market_cap_usd)
            .addField('Last 24 hour (in USD)', '$' + data.total_24h_volume_usd)
            .addField('Total Bitcoin percentage', data.bitcoin_percentage_of_market_cap + '%')
          message.edit({embed})
        })
      })
  }
  if (command === 'stats') {
    const embed = new Discord.RichEmbed()
      .setColor('#ffc107') // Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
      // .setAuthor('CryptoBot', cmImageRoot + 'bitcoin.png')
      // .setTitle('This is your title, it can hold 256 characters')
      // .setURL('https://discord.js.org/#/docs/main/indev/class/RichEmbed')
      // .setDescription('This is the main body of text, it can hold 2048 characters.')
      .setThumbnail(cmImageRoot + 'bitcoin.png')
      .addField('Total server', client.guilds.size, true)
      .addField('Total users', client.guilds.reduce((mem, g) => mem += g.memberCount, 0), true)
      .addField('Version:', config.botVersion, true)
      .addField('Discord.js version:', '11.2.1', true)
      .addField('Uptime:', (Math.round(client.uptime / (1000 * 60 * 60))) + ' hour(s), ' + (Math.round(client.uptime / (1000 * 60)) % 60) + ' minute(s), and ' + (Math.round(client.uptime / 1000) % 60) + ' second(s)', true)
      // .addBlankField(true)
      // .addField('Inline Field 3', 'You can have a maximum of 25 fields.', true)
      // .setImage('http://i.imgur.com/yVpymuV.png')
      // .setFooter('This is the footer text, it can hold 2048 characters', 'http://i.imgur.com/w1vhFSR.png')
      // .setTimestamp()
    message.channel.send({embed})
  }
  if (command === 'help') {
    message.reply('A message containing the bot commands has been sent to you!')
    message.author.send(getHelpMessage())
  }
  if (command === 'hhelp') {
    message.delete()
    message.channel.send(getHelpMessage())
  }
  if (command === 'eval') {
    if (message.author.id !== config.ownerID) return
    try {
      const code = args.join(' ')
      let evaled = eval(code)
      if (typeof evaled !== 'string') {
        evaled = require('util').inspect(evaled)
      }
      message.channel.send(clean(evaled), {code: 'xl'})
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
    }
  }
})

// Returns an object with the coin's data, null if nothing is found
// Callback takes in two parameters, the discordMessage and the coin data.
function getCoinData (coinKey, discordMsg, passBTC, callback) {
  if (!coinKey) { // Quick check to not do API calls if user didn't put in any data
    callback(discordMsg, null)
    return
  }
  request('https://api.coinmarketcap.com/v1/ticker/?limit=0', function (err, response, body) {
    if (err) {
      callback(discordMsg, null)
      discordMsg.channel.sendMessage('```Error, can\'t pull data from CoinMarketCap! ' + err + '```')
      return
    }
    try {
      var allCoinData = JSON.parse(body)
      coinKey = coinKey.toLowerCase()
      var btc = null
      if (passBTC) {
        // Likely always be the first few coin, but CoinMarketCap's does order by marketcap
        for (let nextCoin of allCoinData) {
          if (nextCoin.id === 'bitcoin') {
            btc = nextCoin
            break
          }
        }
      }
      for (let nextCoin of allCoinData) {
        var coinID = nextCoin.id.toLowerCase()
        var coinName = nextCoin.name.toLowerCase()
        var coinSymbol = nextCoin.symbol.toLowerCase()
        if (coinKey === coinID || coinKey === coinName || coinKey === coinSymbol) {
          callback(discordMsg, nextCoin, btc)
          return
        }
      };
      callback(discordMsg, null)
    } catch (err) {
      callback(discordMsg, null)
      discordMsg.channel.sendMessage('```Error when processing coin info! ' + err + '```')
    }
  })
}

function getHelpMessage () {
  var embed = new Discord.RichEmbed()
    .setColor('#ffc107') // Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
    .setAuthor('CryptoBot', cmImageRoot + 'bitcoin.png')
    .addField(':information_source: INFORMATIONS', 'Some informations about the bot')
    .addField('Add the bot to your server', 'https://cryptobot.lucasalt.fr/', true)
    .addField('Version:', config.botVersion, true)
    .addField('Discord.js version:', '11.2.1', true)
    .addField('Made by:', '<@176759285366128641>', true)
    .addField('Join me here:', 'https://discord.gg/4HqYAjy', true)
    .addField('Now available on GitHub:', 'https://github.com/MrDragonXM15/CryptoBot')
    .addField(':level_slider: COMMANDS', 'All commands for the bot')
    .addField('$help', 'See all commands in DM')
    .addField('$hhelp', 'See all commands in global channel')
    .addField('$money <coin>', 'See the value of a currency in USD. \nSupport name and symbol \n__Example :__ `$money bitcoin` or `$money BTC`')
    .addField('$sats <coin>', 'See the value of a currency in sats. \nSupport name and symbol \n__Example :__ `$sats Ethereum` or `$sats ETH`')
    .addField('$marketcap', 'See all informations about the martket cap')
    .addField('$stats', 'Some stats about the bot')
    .addField(':dollar: SUPPORT ME', 'You can send me some cryptocurrencies to help me in the development of the bot')
    .addField('Dogecoin', '`DNbD8 Dnts staV JxeC 54gT wdGL LdLW XuTgX`')
    .addField('Litecoin', '`LPTu 5JMw BVAw RLni5 Jv6R 9xK9 Y9QX vXo1f`')
    .addField('Dash', '`XTxxG FTdY f2sv rAi2 Ym3S GUbG XnBL 12gor`')
    .addField('Ethereum', '`0x58 94e3 2413 34df 48f5b 1992 1444 2bfd b0bf f4b5b`')
  return embed
}

client.login(config.token.dev)
