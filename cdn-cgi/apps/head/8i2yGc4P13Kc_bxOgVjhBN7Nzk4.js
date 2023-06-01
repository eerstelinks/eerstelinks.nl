;window.CloudflareApps=window.CloudflareApps||{};CloudflareApps.siteId="ddfaf0fc52372c5aa6b8a2fc20bba4fb";CloudflareApps.installs=CloudflareApps.installs||{};;(function(){'use strict'
CloudflareApps.internal=CloudflareApps.internal||{}
var errors=[]
CloudflareApps.internal.placementErrors=errors
var errorHashes={}
function noteError(options){var hash=options.selector+'::'+options.type+'::'+(options.installId||'')
if(errorHashes[hash]){return}
errorHashes[hash]=true
errors.push(options)}
var initializedSelectors={}
var currentInit=false
CloudflareApps.internal.markSelectors=function markSelectors(){if(!currentInit){check()
currentInit=true
setTimeout(function(){currentInit=false})}}
function check(){var installs=window.CloudflareApps.installs
for(var installId in installs){if(!installs.hasOwnProperty(installId)){continue}
var selectors=installs[installId].selectors
if(!selectors){continue}
for(var key in selectors){if(!selectors.hasOwnProperty(key)){continue}
var hash=installId+'::'+key
if(initializedSelectors[hash]){continue}
var els=document.querySelectorAll(selectors[key])
if(els&&els.length>1){noteError({type:'init:too-many',option:key,selector:selectors[key],installId:installId})
initializedSelectors[hash]=true
continue}else if(!els||!els.length){continue}
initializedSelectors[hash]=true
els[0].setAttribute('cfapps-selector',selectors[key])}}}
CloudflareApps.querySelector=function querySelector(selector){if(selector==='body'||selector==='head'){return document[selector]}
CloudflareApps.internal.markSelectors()
var els=document.querySelectorAll('[cfapps-selector="'+selector+'"]')
if(!els||!els.length){noteError({type:'select:not-found:by-attribute',selector:selector})
els=document.querySelectorAll(selector)
if(!els||!els.length){noteError({type:'select:not-found:by-query',selector:selector})
return null}else if(els.length>1){noteError({type:'select:too-many:by-query',selector:selector})}
return els[0]}
if(els.length>1){noteError({type:'select:too-many:by-attribute',selector:selector})}
return els[0]}}());(function(){'use strict'
var prevEls={}
CloudflareApps.createElement=function createElement(options,prevEl){options=options||{}
CloudflareApps.internal.markSelectors()
try{if(prevEl&&prevEl.parentNode){var replacedEl
if(prevEl.cfAppsElementId){replacedEl=prevEls[prevEl.cfAppsElementId]}
if(replacedEl){prevEl.parentNode.replaceChild(replacedEl,prevEl)
delete prevEls[prevEl.cfAppsElementId]}else{prevEl.parentNode.removeChild(prevEl)}}
var element=document.createElement('cloudflare-app')
var container
if(options.pages&&options.pages.URLPatterns&&!CloudflareApps.matchPage(options.pages.URLPatterns)){return element}
try{container=CloudflareApps.querySelector(options.selector)}catch(e){}
if(!container){return element}
if(!container.parentNode&&(options.method==='after'||options.method==='before'||options.method==='replace')){return element}
if(container===document.body){if(options.method==='after'){options.method='append'}else if(options.method==='before'){options.method='prepend'}}
switch(options.method){case'prepend':if(container.firstChild){container.insertBefore(element,container.firstChild)
break}
case'append':container.appendChild(element)
break
case'after':if(container.nextSibling){container.parentNode.insertBefore(element,container.nextSibling)}else{container.parentNode.appendChild(element)}
break
case'before':container.parentNode.insertBefore(element,container)
break
case'replace':try{var id=element.cfAppsElementId=Math.random().toString(36)
prevEls[id]=container}catch(e){}
container.parentNode.replaceChild(element,container)}
return element}catch(e){if(typeof console!=='undefined'&&typeof console.error!=='undefined'){console.error('Error creating Cloudflare Apps element',e)}}}}());(function(){'use strict'
CloudflareApps.matchPage=function matchPage(patterns){if(!patterns||!patterns.length){return true}
var loc=document.location.host+document.location.pathname
if(window.CloudflareApps&&CloudflareApps.proxy&&CloudflareApps.proxy.originalURL){var url=CloudflareApps.proxy.originalURL.parsed
loc=url.host+url.path}
for(var i=0;i<patterns.length;i++){var re=new RegExp(patterns[i],'i')
if(re.test(loc)){return true}}
return false}}());CloudflareApps.installs["WPi8LFwmISCn"]={appId:"7_Xyit2tckWZ",scope:{}};;CloudflareApps.installs["WPi8LFwmISCn"].options={"customDomain":"cdn.simpleanalytics.io","hashMode":false,"recordDNT":false,"trackEvents":false};;if(CloudflareApps.matchPage(CloudflareApps.installs['WPi8LFwmISCn'].URLPatterns)){;(function(window,hostname,path,cdn){if(!window)return
var protocol="https://"
var apiUrl=protocol+hostname+path
var cdnUrl=cdn?protocol+cdn:apiUrl+".js"
var con=window.console
var warn=function(message){if(con&&con.warn)con.warn("Simple Analytics: "+message)}
try{var nav=window.navigator
var loc=window.location
var doc=window.document
var userAgent=nav.userAgent
var dis=window.dispatchEvent
var perf=window.performance
var lastSendUrl
var notSending="Not sending requests "
var script=doc.querySelector('script[src="'+cdnUrl+'"]')
var attr=function(script,attribute){return script&&script.getAttribute("data-"+attribute)}
var mode=attr(script,"mode")
var skipDNT=attr(script,"skip-dnt")==="true"
if(userAgent.search(/(bot|spider|crawl)/gi)>-1)
return warn(notSending+"because user agent is a robot")
var post=function(isPushState){var url=loc.protocol+"//"+loc.hostname+loc.pathname
if(mode==="hash"&&loc.hash)url+=loc.hash.split("?")[0]
if(lastSendUrl===url)return
lastSendUrl=url
if(!skipDNT&&"doNotTrack"in nav&&nav.doNotTrack==="1")
return warn(notSending+"when doNotTrack is enabled")
if(loc.hostname==="localhost"||loc.protocol==="file:")
return warn(notSending+"from localhost")
var refMatches=loc.search.match(/[?&](utm_source|source|ref)=([^?&]+)/gi,)
var refs=refMatches?refMatches.map(function(m){return m.split("=")[1]}):[]
var data={url:url}
if(userAgent)data.ua=userAgent
if(refs&&refs[0])data.urlReferrer=refs[0]
if(doc.referrer&&!isPushState)data.referrer=doc.referrer
if(window.innerWidth)data.width=window.innerWidth
try{var back=perf&&perf.getEntriesByType&&perf.getEntriesByType("navigation")[0]&&perf.getEntriesByType("navigation")[0].type?["reload","back_forward"].indexOf(perf.getEntriesByType("navigation")[0].type,)>-1:perf&&perf.navigation&&[1,2].indexOf(perf.navigation.type)>-1
data.unique=isPushState||back?false:doc.referrer?doc.referrer.split("/")[2]!==loc.hostname:true}catch(error){data.error=error.message}
try{data.timezone=typeof Intl!=="undefined"?Intl.DateTimeFormat().resolvedOptions().timeZone:null}catch(error){data.error=error.message}
var request=new XMLHttpRequest()
request.open("POST",apiUrl,true)
request.setRequestHeader("Content-Type","text/plain; charset=UTF-8")
request.send(JSON.stringify(data))}
var his=window.history
var hisPushState=his?his.pushState:null
if(hisPushState&&Event&&dis){var stateListener=function(type){var orig=his[type]
return function(){var rv=orig.apply(this,arguments)
var event=new Event(type)
event.arguments=arguments
dis(event)
return rv}}
his.pushState=stateListener("pushState")
window.addEventListener("pushState",function(){post(1)})}
if(mode==="hash"&&"onhashchange"in window){window.onhashchange=function(){post(1)}}
post()}catch(e){warn(e.message)
var url=apiUrl+".gif"
if(e.message)url=url+"?error="+encodeURIComponent(e.message)
new Image().src=url}})(window,"api.simpleanalytics.io","/post","cdn.simpleanalytics.io/hello.js")}