const jsdom = require("jsdom");
const TelegramBot = require('node-telegram-bot-api');
const jsonfile = require('jsonfile')
const schedule = require('node-schedule')
const {
    JSDOM
} = jsdom;
const file = 'updateCheck.json'
const token = 'REDACTED'
const chatId = 'REDACTED'
const bot = new TelegramBot(token, {
    polling: true
});

console.log('Starting up...')

const rule = new schedule.RecurrenceRule();
rule.minute = 6;

const hourlyCheck = schedule.scheduleJob(rule, () => {
    console.log('checking if website text has changed')
    checkForUpdate()
})

bot.on('message', async (msg) => {
    if (msg.entities[0].type === 'bot_command') {
        console.log('checking manually')
        const res = await checkForUpdate()
        bot.sendMessage(chatId, res);
    }

});

const getDocument = async () => {
    try {
        const dom = await JSDOM.fromURL("https://www.gov.uk/guidance/fix-your-bike-voucher-scheme-apply-for-a-voucher", {})
        // const element = await JSDOM.fragment(document.serialize())
        const result = await dom.window.document.querySelector('#history').textContent
        return result
    } catch (e) {
        console.log(e)
    }
}

const checkForUpdate = async () => {
    try {
        let result = ''
        const regex = /last updated .*/
        const text = (await getDocument()).toString().toLowerCase()
        const textLoc = await text.match(regex)
        console.log(await getJsonFile())
        console.log(textLoc[0])

        if (await getJsonFile() === textLoc[0]) {
            console.log('match')
            result = 'no change to gov voucher site'
        } else {
            console.log('no match')
            result = 'GO GO GO'
            bot.sendMessage(chatId, 'gov bike voucher website has been updated https://www.gov.uk/guidance/fix-your-bike-voucher-scheme-apply-for-a-voucher')
            writeJsonFile(textLoc[0])
        }
        return result


        // (console.log(getFile))

    } catch (e) {
        console.log(e)
    }
}

const writeJsonFile = async (text) => {
    jsonfile.writeFile(file, {
        line: text
    })
    console.log('write Complete')
}

const getJsonFile = async () => {
    try {
        const getFile = await jsonfile.readFile(file)
        return getFile.line
    } catch (e) {
        console.log(e)
    }
}
