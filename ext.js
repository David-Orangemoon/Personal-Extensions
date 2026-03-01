(function(Scratch) {
    //Import the chiptune library
    const importScript = document.createElement("script");
    importScript.type = "module";
    importScript.innerHTML = `
        import {ChiptuneJsPlayer} from 'https://DrSnuggles.github.io/chiptune/chiptune3.js'
        window.ChiptuneJsPlayer = ChiptuneJsPlayer;
    `;

    document.body.appendChild(importScript);

    //Wait to initialize the chiptune.
    window.chiptune = false;

    let metaData = {
        title: "No Song!",

        artist: "No Song!",
        date: "No Song!",

        type: "None",
        type_long: "None",

        message: "There is no song loaded, or playing!",

        dur: 0,

        song: {
            instruments: [ "None" ],
            samples: [ "None" ],
        },
        songs: [ "No Songs" ],

        totalPatterns: 0
    };
    const ready = () => {
        window.removeEventListener("keydown", ready);
        window.removeEventListener("click", ready);
        window.removeEventListener("touchstart", ready);

        chiptune = new ChiptuneJsPlayer();

        chiptune.onMetadata((meta) => {
            metaData = meta;
            subtrack = 0;
        });

        chiptune.onInitialized(() => {
            subtrack = 0;
        })
    }

    window.addEventListener("keydown", ready);
    window.addEventListener("click", ready);
    window.addEventListener("touchstart", ready);

    //The extension stuff
    const audioEngine = Scratch.vm.runtime.audioEngine;

    let lastVolume = -999;
    
    let volumeMul = 1;
    let paused = false;
    let subtrack = 0;
    Scratch.vm.runtime.on("BEFORE_EXECUTE", () => {
        const volume = audioEngine.inputNode.gain.value * volumeMul;
        if (chiptune) {
            if (lastVolume != volume) {
                chiptune.setVol(volume);
                lastVolume = volume;
            }
        }
    });

    class ExtensionBuilder{constructor(t,n,i,l){this.internal={},this.internal.JSON={blocks:[],menus:{}},this.runtime=Scratch.vm.runtime,this.internal.defaultFunction={code(){console.log("This block has no code")},arguments:{}},this.addDocs=t=>{this.internal.JSON.docsURI=t},this.addBlock=(t,n,i,l,e,s)=>{l=l||this.internal.defaultFunction.code,this[n]=l,s=s||{};let o=s;o.disableMonitor||(o.disableMonitor=!0),o.opcode=n,o.blockType=i,o.text=t,o.arguments=e||JSON.parse(JSON.stringify(this.internal.defaultFunction.arguments));let r=this.internal.JSON.blocks.length;return this.internal.JSON.blocks.push(o),this.internal.JSON.blocks[r].addArgument=(t,i,l,e)=>{if(null==(l=l||null))switch(typeof i){case"string":default:l=Scratch.ArgumentType.STRING;break;case"boolean":l=Scratch.ArgumentType.BOOLEAN;break;case"number":case"bigint":l=Scratch.ArgumentType.NUMBER}return null==i?this.internal.JSON.blocks[r].arguments[t]={type:l}:this.internal.JSON.blocks[r].arguments[t]={type:l,defaultValue:i},(e=e||null)&&("string"==typeof e?this.internal.JSON.blocks[r].arguments[t].menu=e:"function"==typeof e||"object"==typeof e?(this.addMenu(n+"_"+t+"_Menu",e,!0),this.internal.JSON.blocks[r].arguments[t].menu=n+"_"+t+"_Menu"):console.error("Menu '"+n+"_"+t+"_Menu'is not valid!")),this.internal.JSON.blocks[r]},this.internal.JSON.blocks[r].setIcon=t=>(this.internal.JSON.blocks[r].blockIconURI=t,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].setFilter=t=>(t=t||Scratch.TargetType.SPRITE,this.internal.JSON.blocks[r].filter=t,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].hideBlock=()=>(this.internal.JSON.blocks[r].hideFromPalette=!0,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].allowMonitor=()=>(this.internal.JSON.blocks[r].disableMonitor=!1,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].stopMoniter=()=>(this.internal.JSON.blocks[r].disableMonitor=!0,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].setEdgeActivation=t=>(this.internal.JSON.blocks[r].isEdgeActivated=t,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].addImage=(t,n,i)=>{i=i||!1;let l={type:Scratch.ArgumentType.IMAGE,dataURI:n,flipRTL:i};return this.internal.JSON.blocks[r].arguments[t]=l,this.internal.JSON.blocks[r]},this.internal.JSON.blocks[r]},this.addMenu=(t,n,i)=>{i=i||!1,"function"==typeof n?(this[t+"Function"]=n,this.internal.JSON.menus[t]={items:t+"Function"}):this.internal.JSON.menus[t]={items:n},this.internal.JSON.menus[t].acceptReporters=i},this.addButton=(t,n,i)=>{n=n||this.internal.defaultFunction.code,i=i||"Button",this["button_"+t]=n;let l={};l.func="button_"+t,l.blockType=Scratch.BlockType.BUTTON,l.text=i;let e=this.internal.JSON.blocks.length;return this.internal.JSON.blocks[e]=l,this.internal.JSON.blocks[e]},this.addDivider=()=>{this.internal.JSON.blocks.push("---")},this.addLabel=t=>{t=t||"N/A";let n={blockType:"label",text:t};this.internal.JSON.blocks.push(n)},this.internal.createBase=()=>{if(t=t||"Extension",n=n||"extension",this.internal.JSON.name=t,this.internal.JSON.id=n,(i=i||{}).blockColor=i.blockColor||null,i.inputColor=i.inputColor||null,i.outlineColor=i.outlineColor||null,null!=i.blockColor){let e=i.blockColor;e>8947848?this.internal.colors=[e,e-197379,e-394758,]:this.internal.colors=[e,e+197379,e+394758,],i.inputColor,this.internal.colors[1]=i.inputColor,i.outlineColor,this.internal.colors[2]=i.outlineColor,this.internal.JSON.color1=this.internal.colors[0],this.internal.JSON.color2=this.internal.colors[1],this.internal.JSON.color3=this.internal.colors[2]}(l=l||{}).blockIconUri=l.blockIconUri||null,l.menuIconUri=l.menuIconUri||l.blockIconUri||null,this.menuUri=l.menuIconUri,this.blockIco=l.blockIconUri,this.docsUri=null},this.internal.createBase(),this.setColors=(t,n,i)=>{t="string"==typeof t?t:(t+0).toString(16),n="string"==typeof n?n:(n+0).toString(16),i="string"==typeof i?i:(i+0).toString(16),this.internal.colors=[0,0,0],this.internal.colors[0]=t,this.internal.colors[1]=n,this.internal.colors[2]=i,this.internal.JSON.color1=t,this.internal.JSON.color2=n,this.internal.JSON.color3=i},this.setMenuIcon=t=>{this.internal.JSON.menuIconURI=t},this.setGlobalBlockIcon=t=>{this.internal.JSON.blockIconURI=t},this.runHat=t=>{this.runtime.startHats(this.internal.JSON.id+"_"+t)},this.getInfo=()=>this.internal.JSON,this.register=()=>{Scratch.extensions.register(this)}}}
    const extension = new ExtensionBuilder("Extension", "extension");

    extension.setColors

    extension.addBlock("load and play [url]", "loadAndPlay", Scratch.BlockType.COMMAND, 
    ({ url }) => {
        if (chiptune) {
            chiptune.load(Scratch.Cast.toString(url));
            subtrack = 0;
            paused = false;
        }
    }).addArgument("url", "https://deskjet.github.io/chiptune2.js/tunes/chipsounds.mod");

    extension.addLabel("Volume");

    extension.addBlock("set volume to [volume]", "setVolume", Scratch.BlockType.COMMAND, 
    ({ volume }) => {
        volumeMul = Math.min(10.0, Math.max(0, (Scratch.Cast.toNumber(volume) / 100)));
    }).addArgument("volume", 100);

    extension.addBlock("current volume", "getVolume", Scratch.BlockType.REPORTER,
    () => volumeMul * 100).allowMonitor();

    extension.addLabel("Time");

    extension.addBlock("resume", "resume", Scratch.BlockType.COMMAND, 
    () => {
        if (chiptune && paused) {
            chiptune.unpause();
            paused = false;
        }
    });

    extension.addBlock("pause", "pause", Scratch.BlockType.COMMAND, 
    () => {
        if (chiptune && !paused) {
            chiptune.pause();
            paused = true;
        }
    });

    extension.addBlock("current time", "getTime", Scratch.BlockType.REPORTER,
    () => {
        if (chiptune) return chiptune.getCurrentTime();
        else return 0;
    }).allowMonitor();

    extension.addBlock("paused?", "isPaused", Scratch.BlockType.BOOLEAN,
    () => { return paused; }).allowMonitor();

    extension.addLabel("Subtracks");

    extension.addBlock("play sub-track [track]", "playSubtrack", Scratch.BlockType.COMMAND, 
    ({ track }) => {
        if (chiptune) {
            let songNumber = Number(track);

            //Incase it is looking for a name string.
            if (isNaN(songNumber)) {
                songNumber = metaData.songs.indexOf(Scratch.Cast.toString(track));
                if (songNumber == -1) songNumber = 1;
                else songNumber++;
            }

            //Clamp result, and play the subsong.
            subtrack = Math.min(metaData.songs.length - 1, Math.max(0, songNumber - 1));
            chiptune.selectSubsong(subtrack);
            paused = false;
        }
    }).addArgument("track", "1");

    extension.addBlock("sub-tracks", "getSubTracks", Scratch.BlockType.REPORTER,
    () => { return metaData.songs.length }).allowMonitor();
    
    extension.addBlock("sub-track names", "getSubTrackNames", Scratch.BlockType.REPORTER,
    () => { return JSON.stringify(metaData.songs) }).allowMonitor();

    extension.addBlock("current sub-track [value]", "getSubTrack", Scratch.BlockType.REPORTER,
    ({ value }) => { 
        if (value == "name") return metaData.songs[subtrack]; 
        else return subtrack + 1; 
    }).addArgument("value", "id", null, [
        { text: "ID", value: "id" },
        { text: "name", value: "name" },
    ]).allowMonitor();

    extension.addLabel("Data");

    extension.addBlock("song [data]", "getData", Scratch.BlockType.REPORTER,
    ({ data }) => {
        switch (data) {
            case "instruments":{ return JSON.stringify(metaData.song.instruments); }
            case "instrumentCount":{ return metaData.song.instruments.length; }

            case "samples":{ return JSON.stringify(metaData.song.samples); }
            case "sampleCount":{ return metaData.song.samples.length; }
        
            default: { return Scratch.Cast.toString(metaData[data] || "N/A"); }
        }
    }).addArgument("data", "title", null, [
        { text: "title", value: "title"},
        { text: "date", value: "date"},
        { text: "artist", value: "artist"},
        { text: "message", value: "message"},
        { text: "instruments", value: "instruments"},
        { text: "instrument count", value: "instrumentCount"},
        { text: "samples", value: "samples"},
        { text: "sample count", value: "sampleCount"},
        { text: "pattern count", value: "totalPatterns"},
    ]).allowMonitor();

    extension.addBlock("song [subtype] type", "getType", Scratch.BlockType.REPORTER,
    ({ subtype }) => Scratch.Cast.toString((subtype == "short") ? metaData.type : metaData.type_long))
    .addArgument("subtype", "short", null, [
        "short",
        "full"
    ]);
    
    extension.register();
})(Scratch);