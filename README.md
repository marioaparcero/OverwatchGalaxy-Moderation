![alt text](https://user-images.githubusercontent.com/76233860/129943828-f084737f-5318-4012-972a-4ef251704b1f.png)
> Squads Moderation simplifies and fastens moderation on a Discord server.<br>

> The way we archieve this is by generating a panel that only staff members can use, on this panel a staff member can set warnings, set timeouts, set temporary bans and set permanent bans.<br>
     <details>
          <summary>Example</summary>
          ![Screenshot](https://user-images.githubusercontent.com/76233860/129933646-06f8d631-b7b5-4e40-8494-5ffc87ca1ef9.png)
     </details>

## WHY SQUADS TRACKER? 📌

> ⁉️ In videogames players want to find teammates and start playing as quick as possible.<br>Tom Clancy's Rainbow Six Siege has no option to add a friend without having to type their username in the game, this can get a bit tiring when playing on large communities.<br>
     <details>
     <summary>💡 Solution</summary>
          Tom Clancy's Rainbow Six Siege provides a [website](https://ubisoftconnect.com/en-US/profile/DANIMANE4/) where you can send a friend request to anyone if you know their username.<br>![Screenshot](https://user-images.githubusercontent.com/76233860/129948735-13bd2b38-4f30-46bf-a5f4-7c6fdd6be2af.png)<br>The bot is programmed to generate links to that [website](https://ubisoftconnect.com/en-US/profile/DANIMANE4/).<br>![Screenshot](https://user-images.githubusercontent.com/76233860/129966638-32f84de7-67c7-4ec3-b782-f8d964dbc0c2.png)
<br>
     </details>
     
> 
> ⁉️ Another problem I encountered was the matchmaking points limitation, e.g. if a player has 2300 points this player won't be able to play with a player that has 3500 points. This is a great idea when it comes down to fair matchmaking, but it takes some time to find out if two players can play together. In some cases players can't play because of 1 point!<br>
    <details>
    <summary>💡 Solution</summary>
          When a member joins a voice channel and their username/nickname matches a profile on Rainbow Six Siege's database their in-game points will be compared with the other members points. If the compairson results in a higher number than the limited which at the moment is 700 points, the bot will display a message like this one:<br>![Screenshot](https://user-images.githubusercontent.com/76233860/129925850-442e504e-78c4-4b43-9f7e-a2178bdcfc0e.png)
    </details>
    
> 
> ⁉️ Last but not least I wanted to simplify the way people invite other players to their voice chat to play togheter. Observing large discord servers I have seen many ways people let others know that they need teammates, the most common one is by typing a command in a text channel which will generate an invitation to their voice channel. This can be really confusing if you don't know the command, it also takes time to type the commands over and over.<br>
    <details>
    <summary>💡 Solution</summary>
          To simplify this invitations the bot attaches a button to the embedded message with the `Invite` label on it.![INVITEBUTTON](https://user-images.githubusercontent.com/76233860/129930923-dd85da96-4ce8-4b83-9a53-2737b91e3ac9.png)<br>Once pressed, a message will be sent to a common text channel where everyone in the discord server will be able to see it.<br>![Screenshot](https://user-images.githubusercontent.com/76233860/129931629-3b4450b8-2681-48de-8618-3383a5ad3707.png)
    </details>


## Setup BOT 🤖

>
> **To be able to use this repository you need to set up an actual Discord bot application via [Discord's website](https://discord.com/developers/applications)**.<br>
> It's effortless to create one. The steps you need to take are as follows:<br>
     <details>
     <summary>Bot creation</summary>
            ▹ 1. Open the [Discord developer portal](https://discord.com/developers/applications) and log into your account.<br><br>
            ▹ 2. Click the `New Application` button on the **top right corner**<br><br>
            ▹ 3. Enter a name. Then confirm the pop-up window by clicking the `Create` button.<br>&nbsp;&nbsp; &nbsp; &nbsp;↳You should see a page like this:<br><br>![image](https://user-images.githubusercontent.com/76233860/130042276-6c9249bc-be0e-4223-ac9b-084af491bf10.png)<br><br>
            ▹ 4. Once you've saved your changes, you can move on by selecting the `Bot` tab in the left panel.<br><br>![image](https://user-images.githubusercontent.com/76233860/130042680-5dcaa111-de93-446c-9627-8d5a18681430.png)<br><br>
            ▹ 5. Click the `Add Bot` button on the right and confirm the pop-up window by clicking `Yes, do it!`.<br><br>
            ▹ 6. Invite the bot to your Discord server, for that you need to go to the `OAuth2` section.<br>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;↳At the bottom of the page, you'll find Discord's OAuth2 URL generator.<br>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;↳Select the `bot` and `applications.commands` options.<br>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;↳A list of permissions will appear, allowing you to configure the permissions your bot needs.<br><br>To ensure that the bot will work properly please mark the next permissions.<br><br>![Screen Shot 2021-08-19 at 12 10 53](https://user-images.githubusercontent.com/76233860/130051477-80ab91db-7ba7-48fe-aef2-7fce67976f29.png)<br><br>
            ▹ 7. Grab the link via the `Copy` button and enter it in your browser. You should see something like this (with your bot's username and avatar):<br><br>![image](https://user-images.githubusercontent.com/76233860/130054627-9d5a6754-8b9b-4637-aed2-3dc547cf9766.png)<br><br>
            ▹ 8. Choose the server you want to add it to and click `Authorize`. Do note that you'll need the `Manage Server` permission on a server to add your bot there.

#

## Contact 📧
* [LinkedIn](https://www.linkedin.com/in/aronel-daniel-manea-10a891168/)
* Discord: SQUADS#6962
