function get() {
    navigator.sendBeacon('https://zobyeteam_dailylogin/receive')
}

addEventListener('message', ({ data }) => {
    if (data.action === 'loadData') {
        // Create Element Day 1 - 6
        const normalRewards = document.querySelector('#normalRewards');
        const items = [...data.items];
        items.splice(6, 1);

        normalRewards.innerHTML = ``;

        for (let index in items) {
            const item = items[index];

            const element = document.createElement('div');

            element.className = 'reward';
            element.innerHTML = `
                <p>Day ${Number(index) + 1}</p>
                    <div class="image">
                        <img src="nui://zobyeteam_inventory/interface/image/items/${item.name}.png">
                    </div>
                <div ${item.canReceive ? 'onclick="get()"' : ''} class="get ${item.isReceived ? 'already' : ''}">${item.isReceived ? 'Already' : 'Get'}</div>
            `;

            normalRewards.appendChild(element);
        }

        // Create ELement Day 7
        bigReward.innerHTML = `
            <p>Day 7</p>
                <div class="image">
                    <img src="nui://zobyeteam_inventory/interface/image/items/${data.items[6].name}.png">
                </div>
            <div ${data.items[6].canReceive ? 'onclick="get()"' : ''} class="get ${data.items[6].isReceived ? 'already' : ''}">${data.items[6].isReceived ? 'Already' : 'Get'}</div>
        `
    } else if (data.action === 'openDisplay') {
        container.style.opacity = 1;
    } else if (data.action === 'closeDisplay') {
        container.style.opacity = 0;
    }
});

addEventListener('keydown', ({ key }) => {
    if (key === 'Escape') {
        navigator.sendBeacon('https://zobyeteam_dailylogin/closeDisplay');
    }
});

// postMessage({
//     action: 'openDisplay'
// })

// postMessage({
//     "items": [
//         {
//             "canReceive": true,
//             "amount": 5,
//             "isReceived": false,
//             "name": "water"
//         },
//         {
//             "amount": 5,
//             "isReceived": false,
//             "name": "water"
//         },
//         {
//             "amount": 5,
//             "isReceived": false,
//             "name": "water"
//         },
//         {
//             "amount": 5,
//             "isReceived": false,
//             "name": "water"
//         },
//         {
//             "amount": 5,
//             "isReceived": false,
//             "name": "water"
//         },
//         {
//             "amount": 5,
//             "isReceived": false,
//             "name": "water"
//         },
//         {
//             "amount": 5,
//             "isReceived": false,
//             "name": "water"
//         }
//     ],
//     "action": "loadData"
// });