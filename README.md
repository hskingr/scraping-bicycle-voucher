# Bicycle Voucher Bot

![Telegram Bot in action](/docs/voucher_bot.png)

In April 2021, I found out there was a government scheme to issue vouchers to people to get money put towards their bicycles being repaired. I was unable to find out when the next batch of vouchers would be issued next so I created a NodeJS app which runs inside a docker container. The everyday the app would be scheduled to scrape the government web page to look for changes or updates. This was fed to a Telegram bot that would notify me if a change was made.

This was a successful project in as much as the app did function as intended and notified me when there were changes. The unfortunate ending to this project was that on 21st December 2021, I received a notification to visit the website by the bot where I discovered that the scheme had been discontinued.