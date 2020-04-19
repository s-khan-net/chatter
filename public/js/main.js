var socketConnection = io();
        socketConnection.on('connect',function(d){
            console.log(`connected -> ${d} --> ${socketConnection.id}`);
            $('#conStatus').removeClass();
            $('#conStatus').addClass('constatus');
            $('#conStatus').html('connected');
            $('#conStatus').show('fast',function () {
               setTimeout(() => {
                $('#conStatus').hide('slow');
               }, 1200); 
            })
        });
        socketConnection.on('connecting',function(d){
            console.log(`connecting! -> ${d}`);
        });
        socketConnection.on('disconnect',function(d){
            console.log(`DISCONNECTED! -> ${d}`);
            $('#conStatus').removeClass();
            $('#conStatus').addClass('disconstatus');
            $('#conStatus').html('disconnected');
            $('#conStatus').show('fast',function () {
               setTimeout(() => {
                $('#conStatus').hide('slow');
               }, 1200); 
            })
        });
        socketConnection.on('reconnecting',function(d){
            console.log(`Reconnecting  -> ${d}`);
        });
    $(document).ready(function(){
        $('#chatters').slimScroll();
        $('#chatBox').slimScroll()
        let name = window.prompt('choose a name');
        if(name) {
            socketConnection.emit('join',{name:name})
        }
        $('#btnSend').click(function(){
            let obj ={name:name?name:'chatter',message:$('#txtChatSend').val()};
            $('#txtChatSend').val('')
            socketConnection.emit('message',obj)
        });
        socketConnection.on('onMessage',function(data){
            $('#chatBox').append(`<div style="border:1px solid #ddd;padding:3px;margin-top: 2px;margin-
        right: 2px;background-color: white;border-radius: 7px;"><div class="row"><div class="col-xs-8" style="letter-spacing:2px;font-size:9px">${data.name}</div></div><div class="row"><div class="col-xs-2"><img src="" width=30 /></div><div class="col-xs-10" style="margin-left:-15px;font-size: 12px;font-family: monospace;">:&nbsp;${data.message}</div></div></div>`);
            $("#chatBox").scrollTop(1E10);
        });
        socketConnection.on('onChatStatus',function(data){
            if(data.status==='join'){
                //add
                $('#chatterList').append(`<li id="${data.name}">${data.name}</li>`);
            }
            if(data.status==='left'){
                //remove
                $('#chatterList li').remove('#'+data.name);
            }
            if(data.name!=name){
                $('#chatStatus').html(data.message);
                $('#chatStatus').show('fast',function(){
                    setTimeout(() => {
                        $('#chatStatus').hide('slow');
                    }, 1200);
                })
            }
        })
    });