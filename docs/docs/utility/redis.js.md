---
id: redis.js
---

## Classes

<dl>
<dt><a href="#Redis
Creates a Redis class">Redis
Creates a Redis class</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getAsync
Gets a string from the redis cache by key">getAsync
Gets a string from the redis cache by key(key)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#setAsync
Sets a value with the provided key">setAsync
Sets a value with the provided key(key, value)</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#delAsync
Deletes the entry with the specific key">delAsync
Deletes the entry with the specific key(key)</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#expireAsync
Sets a keys expiration">expireAsync
Sets a keys expiration(key, time)</a> ⇒ <code>void</code></dt>
<dd></dd>
</dl>

<a name="Redis
Creates a Redis class"></a>

## Redis
Creates a Redis class
**Kind**: global class  
<a name="getAsync
Gets a string from the redis cache by key"></a>

## getAsync
Gets a string from the redis cache by key(key) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - <p>The value</p>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>The key</p> |

<a name="setAsync
Sets a value with the provided key"></a>

## setAsync
Sets a value with the provided key(key, value) ⇒ <code>void</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>The key</p> |
| value | <code>string</code> | <p>The value</p> |

<a name="delAsync
Deletes the entry with the specific key"></a>

## delAsync
Deletes the entry with the specific key(key) ⇒ <code>void</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>The key</p> |

<a name="expireAsync
Sets a keys expiration"></a>

## expireAsync
Sets a keys expiration(key, time) ⇒ <code>void</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>The key</p> |
| time | <code>number</code> | <p>Time until the key should expire, in seconds</p> |

