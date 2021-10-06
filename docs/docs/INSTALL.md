import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation & Hosting Guide
LibreNote is a bot intended for self-hosting. This guide proves instructions for a rudimentary installation of LibreNote through either Docker (recommended) or Node.js.

### Preliminary Steps
#### Prerequisites
<details>
    <summary>Discord Application</summary>
    <div>
        <ol>
            <li>Select <i>New Application</i></li>
            <li>Enter a name for your application, then select <i>Create</i></li>
            <li>Select <i>Bot</i> on the left panel and select <i>Add Bot</i>, confirm the action</li>
            <li>Add the bot to your servers.</li>
            <ul>
                <li>https://discord.com/api/oauth2/authorize?client_id=CLIENTID&permissions=8&scope=bot%20applications.commands</li>
                <li>Replace <samp>Client ID</samp> in the URL with the <i>Application ID</i> from the Application <i>General Information</i></li>
            </ul>
            <li>Take note of your <i>Client ID</i> from the <i>General Information</i> tab and <i>Bot Token</i> from the <i>Bot</i> tab</li>
        </ol>
    </div>
</details>
<details>
    <summary>Spotify Client & Secret</summary>
    <div>
        <ol>
            <li>Create or log into your <a href="https://www.spotify.com/signup/">Spotify account</a></li>
            <li>Go to your <a href="https://developer.spotify.com/dashboard/">Spotify Dashboard</a></li>
            <li>Select <i>Create an app</i></li>
            <li>Enter an application name and description</li>
            <li>Read and agree to the developer terms & branding guidelines</li>
            <li>Select <i>Create</i></li>
            <li>Take note of your <i>Client ID</i> and <i>Client Secret</i></li>
        </ol>
    </div>
</details>

#### Constructing the .env
1. Create a file named `.env` and give it the following template:
```
BOT_TOKEN=
CLIENT_ID=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
```
2. This file follows a `key=value` pattern. Fill it out using the values noted from the prerequisite steps.

### Installation

#### Docker
LibreNote is provided as a Docker image, which you may run in a container. This is the recommended method for most hosts. Begin by ensuring that you have [Docker](https://www.docker.com/) and [Node.js (v16)](https://nodejs.org/) installed. You may also need to enable [Windows HyperV](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v) for Docker on Windows to work.

<details>
    <summary>Redis</summary>
    <div>
        Begin by installing and running Redis in Docker: <br/>
        <code>
            docker pull redis <br/>
            docker run --name main-redis -d -p 6379:6379 --restart=unless-stopped redis
        </code>
    </div>
</details>

When all requirements are met, and Redis is set up, you can install LibreNote in Docker. This can be done with the following commands. In the second command, replace `ENV_PATH` with the relative or absolute path to the `.env` file created in the preliminary steps.

```
docker pull ghcr.io/oprogram/librenote:latestdocker
docker run --name librenote --env-file=ENV_PATH -d --network=host --restart=unless-stopped ghcr.io/oprogram/librenote:latest
```

#### Node.js
Those who elect to use avoid Docker, may also run LibreNote with Node.js (with or without a process manager). Hosts should be weary of this method, while it is much more easier to set up, there have been historical issues relating to the functioning of ytdl, a necessary LibreNote component. As such, it is recommended that most users stick to Docker hosting. For those who wish to use Node, ensure that you have installed [Node.js (v16)](https://nodejs.org/), [Git](https://git-scm.com/downloads) and [Redis (Windows Subsystem for Linux)](https://medium.com/@RedisLabs/windows-subsystem-for-linux-wsl-10e3ca4d434e) or [Redis (Legacy, unmaintained windows port)](https://github.com/microsoftarchive/redis/releases/tag/win-3.0.504).

Begin by cloning the LibreNote Git repository to a location where you may ensure that it stays.
```
git clone https://github.com/oprogram/LibreNote.git
cd librenote
```

At this point, you should wish to move your previously created `.env` file to the new LibreNote directory which you have cloned. Thereafter, install LibreNote's dependencies and start the bot.
```
npm install
node dev/commands.js
node dev/run.js
```
At this point, if no errors are displayed, you may stop the bot via <kbd>Ctrl + C</kbd>. You may also set up your desired process manager now.

To start the bot again, simply execute:
```
node dev/commands.js
node dev/run.js
```