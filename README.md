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
        docker run --name librenote --env-file=<PATH.TO.ENV.FILE> -d --network=host --restart=unless-stopped ghcr.io/librenotebot/librenote:latest
        ```
5. LibreNote should be online in the servers you've added it to.

### PM2
You can run LibreNote with PM2, without a process manager, or another one of your choosing.
Ensure you have [Node.js (v16)](https://nodejs.org/), [Git](https://git-scm.com/downloads) and [Redis (Windows Subsystem for Linux, reccomended)](https://medium.com/@RedisLabs/windows-subsystem-for-linux-wsl-10e3ca4d434e) or [Redis (Legacy, unmaintained windows port)](https://github.com/microsoftarchive/redis/releases/tag/win-3.0.504) installed.

3. Open a command line and run the following.
    * Clone the LibreNote repository to your PC.
        ```
        git clone https://github.com/LibreNoteBot/LibreNote.git
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
Being an open source project, contributing to the development of LibreNote is strongly encouraged and welcomed. Contribution may be made, predominantly, by two means: submitting and participating in [issues on the LibreNote GitHub repository](https://github.com/oprogram/LibreNote/issues); or submitting code changes throguh pull requests.

### Issues
Interacting with issues is the most basic form of contributing to the LibreNote project, and may be done on the aforementioned issues section of the LibreNote GitHub repository. While submitting an issue is easy, there are several expectations made of those who wish to submit.

1. Firstly, it is important to remember that issues should not be treated as requests for technical support, which should be handled, especially for the main bot instance, via the [LibreNote Discord Server](https://discord.gg/nHzpQt7p5x). Issues are a way for LibreNote hosts and developers to exchange information about technical or code problems.
2. Issues are not a place to offer futile feature suggestions. While issues can be used by developers to discuss missing features and how the developer aims to implement them, or even an envisioned route of implementation by a creative contributor, it is expected that this will be more verbose and rich than simply stating 'Please add $X feature', where variable X is a pointless and stupid idea that should be ignored. 
3. Issues should be comprehensive and offer an abundance of detail regarding the problem. Unless the issue is outstandingly trivial, it is expected that an issue will be submitted with, at least: a sequence of steps that need to be taken to reproduce the error; a stack trace; and, optionally, a list or assumption of which parts of the LibreNote codebase have caused this issue to transpire (e.g. 'the play command', 'the Spotify utility').
4. Expectations also exist for individuals who are commenting on issues. Primarily, if a solution is found, the person who has found it should give an in-depth explanation of how the solution works, rather than ignoring the issue or, worse, commenting a single vague message such as 'I solved it'. While this cannot be enforced, it will hopefully stick in the conscience of inconsiderate fools who decide to treasure the secrets of the Discord music bot to themselves. In addition to this specific example of respect, it is important to note that civility is universally expected in the conduct of LibreNote business.

### Pull Requests
Pull requests are a way for developers to present their own changes to a source tree, which they wish to be merged to that source tree. There do not exist many restrictions on what a developer may wish contribute, as all pull requests are reviewed individually; however, some general expectations are made

1. Firstly, the code must comply with the nature of the project. LibreNote is a configurable Discord music bot, requests which fail to recognise this and attempt to add irrelevant features will be rejected.
2. Code style is to be kept consistent within the project. ESLint exists for this purpose.
3. Requests which modify or add major portions of or to the codebase should be discussed during the development process of such changes. This can be done in the LibreNote Discord server or in the LibreNote GitHub issues section.
4. It is recommended that first-time LibreNote contributors submit small changes to existing features for their first few commits. Beginning with small changes allows for easier accustomisation with the codebase and avoids, early, what may have become future obstructions.