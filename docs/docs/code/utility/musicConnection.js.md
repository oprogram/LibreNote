---
id: musicConnection.js
---

## Classes

<dl>
<dt><a href="#MusicConnection
 Creates and returns a MusicConnection class">MusicConnection
 Creates and returns a MusicConnection class</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#addToQueue">addToQueue(track)</a></dt>
<dd><p>Adds a Track class to the queue</p></dd>
<dt><a href="#stop
 Stops the player and clears the queue.">stop
 Stops the player and clears the queue.()</a></dt>
<dd></dd>
<dt><a href="#processQueue
 Processes the queue, plays the next track if there is one.">processQueue
 Processes the queue, plays the next track if there is one.()</a></dt>
<dd></dd>
</dl>

<a name="MusicConnection
 Creates and returns a MusicConnection class"></a>

## MusicConnection
 Creates and returns a MusicConnection class
**Kind**: global class  
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

<a name="new_MusicConnection
 Creates and returns a MusicConnection class_new"></a>

### new MusicConnection
 Creates and returns a MusicConnection class(voiceConnection)

| Param | Type | Description |
| --- | --- | --- |
| voiceConnection | <code>object</code> | <p>discord.js voice connection</p> |

<a name="addToQueue"></a>

## addToQueue(track)
<p>Adds a Track class to the queue</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| track | <code>object</code> | <p>Track Class</p> |

<a name="stop
 Stops the player and clears the queue."></a>

## stop
 Stops the player and clears the queue.()
**Kind**: global function  
<a name="processQueue
 Processes the queue, plays the next track if there is one."></a>

## processQueue
 Processes the queue, plays the next track if there is one.()
**Kind**: global function  
