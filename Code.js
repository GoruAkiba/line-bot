/**
 * GAS LINE BOT WEBHOOK
 * @description line bot webhook based using google appsscript server.
 * @author  gb_sources
 * @vers  v_0.0.1
 */

// script properties definition ====================================================
var scriptProps = PropertiesService.getScriptProperties();

// define database id (spreadsheet id)
const db_id = scriptProps.getProperty("db_id");

// define database table (worksheet name)
const db_index = scriptProps.getProperty("db_index");

// define channel access token (find out at ur dev line dashboard https://developers.line.biz/console/)
const channel_access_token = scriptProps.getProperty("channel_access_token");


// webserver handler ===============================================================
function doPost(e){
  // retrieve postData content
  var msg_data = e.postData.contents;

  // logging postData
  log(msg_data);

  try{
    // init client
    const bot = new line_bot(channel_access_token);
    // resolve message object, init messageService
    var msg = bot.resolveMessage(msg_data);

    // action deppends on message.type
    if(msg.type){
      switch(msg.type){
        case "message":
          msg.replyMessage([
            {
              type: "text",
              text: msg.message.text
            }
          ]);

        break;

        case "sticker":
        break;

        case "image":
        break;

        case "video":
        break;

        case "audio":
        break;

        case "location":
        break;

        case "imagemap":
        break;

        case "template":
        break;

        case "flex":
        break;

        
        default:
        break;
      }
    }

    return send({
      code: 200,
      msg: null
    })
  }catch(err){
    log("[ERR] "+ err);
  }
}


// additional function =============================================================
// logger function, send any err message to spreadsheet
function log(err){
  var timestamp = new Date().toISOString();
  var database = new db(db_id, db_index);
  database.init();
  database.bulkWrite([
    [
      timestamp,
      err
    ]
  ])
  return true;
}

// content service handler, handling any web interaction
function send(obj){
  obj = typeof obj == "object"? obj : JSON.stringify(obj);

  return ContentService.createTextOutput(obj)
  .setMimeType(ContentService.MimeType(JSON));
}

// custom test function
function myFunction() {
  const bot = new line_bot(channel_access_token);
  var to = "Uda12fae9759543f2a2b8ccb44285606b";
  try{
    var res = bot.pushMessage(to, [
      {
        type: "text",
        text: "masuk ga?"
      }
    ])
  }catch(err){
    log("[ERR] "+err);
  }
}