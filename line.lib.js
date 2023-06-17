/**
 * GAS Line Client
 * @description google apps script based Line Client
 * @author  gb_sources
 * @vers  v_0.0.1
 */
const base_line_endpoint = "https://api.line.me/v2/bot"

class line_bot{
  constructor(channel_access_token){
    this.channel_access_token = channel_access_token;
    this.authorization = `Bearer ${this.channel_access_token}`;

    return this;
  }

  resolveMessage(obj){
    obj = typeof obj == "object"? obj : JSON.parse(obj);
    var message = new messageService(this, obj)
    if(obj.events.length == 0) return null;
    message.fromObj(obj.events[0]);

    return message;
  }

  pushMessage(to, msg_arr){
    if(!to) throw "please specify 'to' variable"
    var server = base_line_endpoint + `/message/push`
    var msg_obj = {
      to,
      messages: msg_arr
    }

    var opt = {
      headers:{
        'Content-Type': 'application/json',
        "Authorization" : this.authorization
      },
      method: "POST",
      payload: JSON.stringify(msg_obj)
    }

    // log(this.message);

    var res = UrlFetchApp.fetch(server, opt);
  }
}


class messageService{
  constructor(client, obj){
    this.client = client;
  }

  fromObj(msg_obj){
    Object.keys(msg_obj).map( index => {
      this[index] = msg_obj[index];
    })

    return this;
  }

  replyMessage(msg_arr){
    var server = base_line_endpoint + `/message/reply`
    var msg_obj = {
      replyToken : this.replyToken,
      messages: msg_arr
    }

    var opt = {
      headers:{
        'Content-Type': 'application/json',
        "Authorization" : this.client.authorization
      },
      method: "POST",
      payload: JSON.stringify(msg_obj)
    }

    // log(this.message);

    var res = UrlFetchApp.fetch(server, opt);
  }
}