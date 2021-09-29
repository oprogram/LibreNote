---
id: musicConnection.js
---

<a name="module_musicConnection"></a>

## musicConnection
**Example**  
```js
new MusicConnection(
		joinVoiceChannel(...),
	);
```

* [musicConnection](#module_musicConnection)
    * [~MusicConnection](#module_musicConnection..MusicConnection)
        * [new MusicConnection(voiceConnection)](#new_module_musicConnection..MusicConnection_new)
    * [~addToQueue(track)](#module_musicConnection..addToQueue)
    * [~stop()](#module_musicConnection..stop)
    * [~processQueue()](#module_musicConnection..processQueue)

<a name="module_musicConnection..MusicConnection"></a>

### musicConnection~MusicConnection
**Kind**: inner class of [<code>musicConnection</code>](#module_musicConnection)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| voiceConnection | <code>object</code> | <p>The @discordjs/voice VoiceConnection</p> |
| audioPlayer | <code>object</code> | <p>The @discordjs/voice audio player</p> |
| queueLock | <code>boolean</code> | <p>Queue Lock</p> |
| readyLock | <code>boolean</code> | <p>Ready Lock</p> |
| currentTrack | <code>Object</code> | <p>Currently playing track</p> |
| queue | <code>Array</code> | <p>Array of tracks queued</p> |
| loop | <code>string</code> | <p>Loop mode</p> |
| shuffle | <code>boolean</code> | <p>Shuffle mode</p> |

<a name="new_module_musicConnection..MusicConnection_new"></a>

#### new MusicConnection(voiceConnection)
<p>Creates and returns a MusicConnection class</p>


| Param | Type | Description |
| --- | --- | --- |
| voiceConnection | <code>object</code> | <p>discord.js voice connection</p> |

<a name="module_musicConnection..addToQueue"></a>

### musicConnection~addToQueue(track)
<p>Adds a Track class to the queue</p>

**Kind**: inner method of [<code>musicConnection</code>](#module_musicConnection)  

| Param | Type | Description |
| --- | --- | --- |
| track | <code>object</code> | <p>Track Class</p> |

<a name="module_musicConnection..stop"></a>

### musicConnection~stop()
<p>Stops the player and clears the queue.</p>

**Kind**: inner method of [<code>musicConnection</code>](#module_musicConnection)  
<a name="module_musicConnection..processQueue"></a>

### musicConnection~processQueue()
<p>Processes the queue, plays the next track if there is one.</p>

**Kind**: inner method of [<code>musicConnection</code>](#module_musicConnection)  
