---
id: redis.js
---

## Classes

<dl>
<dt><a href="#Redis">Redis</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getAsync">getAsync(key)</a> ⇒ <code>string</code></dt>
<dd><p>Gets a string from the redis cache by key</p></dd>
<dt><a href="#setAsync">setAsync(key, value)</a> ⇒ <code>void</code></dt>
<dd><p>Sets a value with the provided key</p></dd>
<dt><a href="#delAsync">delAsync(key)</a> ⇒ <code>void</code></dt>
<dd><p>Deletes the entry with the specific key</p></dd>
<dt><a href="#expireAsync">expireAsync(key, time)</a> ⇒ <code>void</code></dt>
<dd><p>Set's a key's expiration</p></dd>
</dl>

<a name="Redis"></a>

## Redis
**Kind**: global class  
<a name="new_Redis_new"></a>

### new Redis()
<p>Creates a Redis class</p>

<a name="getAsync"></a>

## getAsync(key) ⇒ <code>string</code>
<p>Gets a string from the redis cache by key</p>

**Kind**: global function  
**Returns**: <code>string</code> - <p>The value</p>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>The key</p> |

<a name="setAsync"></a>

## setAsync(key, value) ⇒ <code>void</code>
<p>Sets a value with the provided key</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>The key</p> |
| value | <code>string</code> | <p>The value</p> |

<a name="delAsync"></a>

## delAsync(key) ⇒ <code>void</code>
<p>Deletes the entry with the specific key</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>The key</p> |

<a name="expireAsync"></a>

## expireAsync(key, time) ⇒ <code>void</code>
<p>Set's a key's expiration</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>The key</p> |
| time | <code>number</code> | <p>Time until the key should expire, in seconds</p> |

