# LibreNote
## Installation & Hosting Guide

1. [Create a Discord application](https://discord.com/developers/applications) (discord bot).
    * Select *New Application*.
    * Choose a name for your application and click *Create*.
    * Select *Bot* on the left panel and click *Add Bot*, confirm the action.
    * Add the bot to the servers you want it to be in.
        * https://discord.com/api/oauth2/authorize?client_id=CLIENTID&permissions=8&scope=bot%20applications.commands
        * Replace `CLIENTID` in the link with the *APPLICATION ID* from *General Information*. 
2. [Get a Spotify Client ID & Secret](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app).
    * You will require a [Spotify Account](https://www.spotify.com/signup).
    * Go to your [Spotify Dashboard](https://developer.spotify.com/dashboard/)
        * Select *CREATE AN APP*
        * Enter an App name and App description.
        * Read & agree to the developer terms & branding guidelines.
        * Select *CREATE*.
        * Have your *Client ID* and *Client Secret* ready for Step 3.

### Docker (Reccomended)
You can run LibreNote with Docker.
Ensure you have [Docker](https://www.docker.com/) and [Node.js (v16)](https://nodejs.org/) installed.

3. Create a file named `librenote.env`, fill it with the following content:
    * Copy your bot's **TOKEN** from *Bot* on the left panel and place it after `BOT_TOKEN=`.
    * Copy your bot's **APPLICATION ID** from *General Information* on the left panel and place it after `CLIENT_ID=`.
    * Copy your Spotify **Client ID** created in step 2, and place it after `SPOTIFY_CLIENT_ID=`.
    * Copy your Spotify **Client Secret** created in step 2, and place it after `SPOTIFY_CLIENT_SECRET=`.
    * Save the file.
    ```env
    BOT_TOKEN=
    SPOTIFY_CLIENT_ID=
    SPOTIFY_CLIENT_SECRET=
    ```
4. Open a command line and run the following commands:
    * Install & start Redis with docker:
        ```
        docker pull redis
        docker run --name main-redis -d -p 6379:6379 --restart=unless-stopped redis 
        ```
    * Install & start LibreNote with docker:
        * Replace `<PATH.TO.ENV.FILE>` with a path (can be relative) to the file created in step 3.
        * e.g. (windows) if you created your file in Documents, the path would be `C:\Users\YOURUSERNAME\Documents\librenote.env` for `--env-file=C:\Users\YOURUSERNAME\Documents\librenote.env`.
        * Replace `YOURUSERNAME` with your windows username.
        ```
        docker pull ghcr.io/oprogram/librenote:latest
        docker run --name librenote --env-file=<PATH.TO.ENV.FILE> -d --network=host --restart=unless-stopped ghcr.io/oprogram/librenote:latest
        ```
5. LibreNote should be online in the servers you've added it to.

### PM2
You can run LibreNote with PM2, without a process manager, or another one of your choosing.
Ensure you have [Node.js (v16)](https://nodejs.org/), [Git](https://git-scm.com/downloads) and [Redis (Windows Subsystem for Linux, reccomended)](https://medium.com/@RedisLabs/windows-subsystem-for-linux-wsl-10e3ca4d434e) or [Redis (Legacy, unmaintained windows port)](https://github.com/microsoftarchive/redis/releases/tag/win-3.0.504) installed.

3. Open a command line and run the following.
    * Clone the LibreNote repository to your PC.
        ```
        git clone https://github.com/oprogram/LibreNote.git
        ```
    * Change your directory to the one just created for the repository.
        ```
        cd LibreNote
        ```
    * Install the required npm modules.
        ```
        npm install
        ```
    * Install node PM2 (if you want to use this process manager).
        ```
        npm install pm2 -g
        ```
    
4. Create a file named `.env` in the current directory, fill it with the following content:
    * Copy your bot's **TOKEN** from *Bot* on the left panel and place it after `BOT_TOKEN=`.
    * Copy your bot's **APPLICATION ID** from *General Information* on the left panel and place it after `CLIENT_ID=`.
    * Copy your Spotify **Client ID** created in step 2, and place it after `SPOTIFY_CLIENT_ID=`.
    * Copy your Spotify **Client Secret** created in step 2, and place it after `SPOTIFY_CLIENT_SECRET=`.
    * Save the file.
    ```env
    BOT_TOKEN=
    SPOTIFY_CLIENT_ID=
    SPOTIFY_CLIENT_SECRET=
    ```

5. Enter the command line again and run the following commands.
    * Register LibreNote's commands.
        ```
        node dev/commands.js
        ```
    * Run the bot without PM2, test success.
        ```
        node dev/run.js
        ```
    * If no errors are present, exit via <kbd>Ctrl</kbd> + <kbd>C</kbd>.
    * Start LibreNote with PM2.
        ```
        pm2 start dev/run.js --name librenote
        ```
    * If you would like it to auto-restart on boot, follow [this guide](https://pm2.keymetrics.io/docs/usage/startup/).
    
6. LibreNote should be online in the servers you've added it to.

## Contributing

For information on contributing to LibreNote, see our [CONTRIBUTING.md](http://librenote.org/CONTRIBUTING)