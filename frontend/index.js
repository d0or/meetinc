var WAE = require('web-auto-extractor').default
var request = require('request')
var pageUrl = 'https://www.meetup.com/coding-stuttgart/events/264920252/'

request(pageUrl, function (error, response, body)
{
  var wae = WAE()
  var parsed = wae.parse(body)
  console.log(parsed.jsonld.Event)
})