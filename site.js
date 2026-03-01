const createExtensionElement = (extension) => {
    if (typeof extension != "object") {
        const p = document.createElement("h2");
        p.className = "centerText"
        p.innerText = extension;
        return p;
    }
    const container = document.createElement("div");
    switch (extension.type) {
        case "category": {
            container.className = "listCategory";
            
            const p = document.createElement("h1");
            p.innerText = extension.name
            p.className = "centerText";

            container.appendChild(p);

            parseList(container, extension.contents);
            break;
        }
    
        default: {
            let base = location.href.split("/");

            const url = `${base}/ext.js`;
 
            container.className = "extension";

            const name = document.createElement("h3");
            name.className = "centerText";
            name.innerText = extension.name;

            const description = document.createElement("p");
            description.className = "centerText";
            fetch(`extensions/${extension.id}/description.txt`).then(res => res.text()).then((text) => {
                description.innerText = text;
            }).catch(() => {});

            const buttonHolder = document.createElement("div");
            buttonHolder.className = "extensionButtons"

            if (extension.type == "artimus") {
                const copyURL = document.createElement("button");
                copyURL.innerText = "Copy URL";
                copyURL.style.setProperty("--color-1", "#2c88d4");
                copyURL.style.setProperty("--color-2", "#146ab1");
                copyURL.onclick = () => { navigator.clipboard.writeText(extension.url || url); }

                buttonHolder.appendChild(copyURL);
            }
            else {
                const copyCode = document.createElement("button");
                copyCode.innerText = "Copy Code";
                copyCode.style.setProperty("--color-1", "#2c61d4");
                copyCode.style.setProperty("--color-2", "#1d50be");
                copyCode.onclick = () => { fetch(url).then(res => res.text()).then((text) => {
                    navigator.clipboard.writeText(text);
                })}
                
                const copyURL = document.createElement("button");
                copyURL.innerText = "Copy URL";
                copyURL.style.setProperty("--color-1", "#2c88d4");
                copyURL.style.setProperty("--color-2", "#146ab1");
                copyURL.onclick = () => { navigator.clipboard.writeText(url); }
                
                const openInMist = document.createElement("a");
                openInMist.innerText = "Open in Mist-Warp";
                openInMist.style.setProperty("--color-1", "#c02cd4");
                openInMist.style.setProperty("--color-2", "#9d10af");
                openInMist.href = `https://warp.mistium.com/editor?extension=${url}`;

                buttonHolder.appendChild(copyCode);
                buttonHolder.appendChild(copyURL);
                buttonHolder.appendChild(openInMist);
            }

            container.appendChild(name);
            container.appendChild(description);
            container.appendChild(buttonHolder);
            break;
        }
    }

    return container;
}

const parseList = (element, json) => {
    for (let extensionID in json) {
        const extension = json[extensionID];
        element.appendChild(createExtensionElement(extension));
    }
}

fetch("extensions/list.json").then(res => res.text()).then((text) => {
    const json = JSON.parse(text);
    parseList(document.body, json);
})